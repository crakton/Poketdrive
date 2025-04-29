import { ChatContext, ChatContextType } from "@context/chat";
import { useContext } from "react";

export const useChat = (): ChatContextType => {
	const context = useContext(ChatContext);
	if (context === undefined) {
		throw new Error("useChat must be used within a ChatProvider");
	}
	return context;
};
