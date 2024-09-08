import { nanoid } from 'nanoid';
import { createContext, useCallback, useContext, useState } from 'react';

export enum MessageType {
	SUCCESS,
	INFO,
	WARNING,
	ERROR,
}

export type MessageItem = {
	id: string;
	message: string;
	type: MessageType;
};

interface MessageContextProps {
	messages: MessageItem[];
	insertMessage: (message: string, type: MessageType) => void;
	shiftMessage: () => void;
	removeMessage: (messageId: string) => void;
}

const MessageContext = createContext<MessageContextProps>({
	messages: [],
	insertMessage: () => {},
	shiftMessage: () => {},
	removeMessage: () => {},
});

export const MessageProvider = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	// Manage state of the message queue
	const [messages, setMessages] = useState<MessageItem[]>([]);

	// Helper function to insert messages in the message queue
	const insertMessage = useCallback((message: string, type: MessageType) => {
		setMessages((previous: MessageItem[]) => [
			...previous,
			{ message, type, id: nanoid() },
		]);
	}, []);

	// Helper function to delete the last message in the message queue
	const shiftMessage = useCallback(() => {
		setMessages((previous: MessageItem[]) => {
			const tempArray: MessageItem[] = [...previous];
			tempArray.shift();
			return tempArray;
		});
	}, []);

	// Helper function to remove the message from the message queue
	const removeMessage = useCallback((messageId: string) => {
		setMessages((previous: MessageItem[]) =>
			previous.filter((message: MessageItem) => message.id !== messageId)
		);
	}, []);

	return (
		<MessageContext.Provider
			value={{ messages, insertMessage, shiftMessage, removeMessage }}>
			{children}
		</MessageContext.Provider>
	);
};

export const useMessageContext: () => MessageContextProps = () =>
	useContext(MessageContext);
