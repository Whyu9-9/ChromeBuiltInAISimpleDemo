type Message = {
    id: number;
    text: string;
    isUser: boolean;
    responseTime?: number | null;
}

type FormProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    input: string;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    isChrome: boolean;
}