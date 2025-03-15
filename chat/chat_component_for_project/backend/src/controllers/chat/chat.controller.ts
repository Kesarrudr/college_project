import prisma from "../../prisma_client";
import { getReceiverSocketId, io } from "../../socket/socket";
import { asyncHandler } from "../../utils/asyncHandler";
import { SendMessageValidator } from "../../validators/chat/chat.validator";
import { CustomRequest } from "../auth/user.controller";

const sendMessage = asyncHandler(async (req: CustomRequest, res) => {
  try {
    const senderId = req.user?.id;
    const receiverId: string = req.params.id;
    console.log("receiverId", receiverId);
    const body = SendMessageValidator(req.body);
    if (body.success) {
      const message: string = body.data.message;

      if (senderId) {
        if (senderId === receiverId) {
          res.status(401).json({
            message: "can't send message to your self",
          });
        }
        let conversation = await prisma.conversation.findFirst({
          where: {
            participantsIds: {
              hasEvery: [senderId, receiverId],
            },
          },
        });
        if (!conversation) {
          conversation = await prisma.conversation.create({
            data: {
              participantsIds: [senderId, receiverId],
            },
          });
        }
        const newMessage = await prisma.message.create({
          data: {
            senderId,
            receiverId,
            message,
          },
          select: {
            id: true,
            message: true,
            senderId: true,
            receiverId: true,
            createdAt: true,
          },
        });
        if (newMessage) {
          await prisma.conversation.update({
            where: {
              id: conversation.id,
            },
            data: {
              messageIds: {
                push: newMessage.id,
              },
            },
          });
        }
        // console.log("new message", newMessage);
        const receiverSocketId = getReceiverSocketId(receiverId);
        // console.log("receiverId", receiverId);
        // console.log("receiver socket id", receiverSocketId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
          // console.log("emitted message ", newMessage);
        }
        res.status(200).json({
          newMessage,
        });
      }
    }
  } catch (error) {
    console.error("form the send Message controller", error);
    res.status(500).json({
      message: "Internal server Error",
    });
  }
});

const getMessages = asyncHandler(async (req: CustomRequest, res) => {
  try {
    const userToChatId = req.params?.id;
    const senderId = req.user?.id;
    if (senderId) {
      if (userToChatId === senderId) {
        res.status(401).json({
          message: "not chat with you self",
        });
      }
      const conversation = await prisma.conversation.findFirst({
        where: {
          participantsIds: {
            hasEvery: [senderId, userToChatId],
          },
        },
      });
      if (!conversation) {
        res.status(200).json([]);
      }
      const messages = await prisma.message.findMany({
        where: {
          id: {
            in: conversation?.messageIds,
          },
        },
        select: {
          id: true,
          message: true,
          senderId: true,
          receiverId: true,
          createdAt: true,
        },
      });
      res.status(200).json(messages);
    }
  } catch (error) {
    console.error("Error in the getMessages controller", error);
    res.status(500).json({
      message: "Internal server Error",
    });
  }
});
export { getMessages, sendMessage };
