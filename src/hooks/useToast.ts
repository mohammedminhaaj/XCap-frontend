import { MessageType, useMessageContext } from '../store/MessageProvider';

export default function useToast() {
	/*
		Custom hook to display toast messages
	*/
	const { insertMessage, shiftMessage } = useMessageContext();
	const insertToast = (
		message: string,
		type: MessageType = MessageType.SUCCESS
	) => {
		insertMessage(message, type);
		setTimeout(() => {
			shiftMessage();
		}, 5000);
	};

	return insertToast;
}
