import { useRef, useState } from "react";
import { isChrome } from "react-device-detect";
import { Form } from "./components/Form";
import { BrowserException } from "./components/BrowserException";
import { DemoIntro } from "./components/DemoIntro";
import { Chat } from "./components/Chat";
import { Body } from "./components/Body";
import { Main } from "./components/Main";
import Snackbar from '@mui/material/Snackbar';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

declare const window: any;

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustTextareaHeight();
  };

  const handleCopyMessage = (text: string) => {
    setOpen(true);
    navigator.clipboard.writeText(text);
  };

  const handleAIResponse = async (text: string) => {
    const startTime = Date.now();
    const canCreate = await createTextSessionAndPrompt(text, startTime);
    setLoading(false);
    return canCreate;
  };

  const createTextSessionAndPrompt = async (text: string, startTime: number) => {
    try {
      const canCreate = await window.ai.canCreateTextSession();
      if (canCreate !== "no") {
        const session = await window.ai.createTextSession();
        const result = await session.prompt(text);
        const endTime = Date.now();
        const calculatedResponseTime = (endTime - startTime) / 1000;
        session.destroy();
        return { result, calculatedResponseTime };
      } else {
        return { errorMessage: "Sorry, I can't create a session right now. Please try again later.", calculatedResponseTime: 0 };
      }
    } catch (error) {
      return { errorMessage: "You run this code in a non-dev version browser. Please try using the dev version browser (Chrome Canary or Chrome Dev).", calculatedResponseTime: 0 };
    }
  };

  const handleReload = async (id: number) => {
    const prevMessage = messages.find((message) => message.id === id - 1);
    setMessages((prevMessages) => prevMessages.slice(0, -1));
    setLoading(true);

    if (prevMessage) {
      const { result, calculatedResponseTime, errorMessage } = await handleAIResponse(prevMessage.text);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessage.id + 1,
          text: errorMessage || result,
          isUser: false,
          responseTime: calculatedResponseTime,
        },
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
    }

    const newMessage = { id: messages.length > 0 ? messages[messages.length - 1].id + 1 : 1, text: input, isUser: true, responseTime: null };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
    setLoading(true);

    const { result, calculatedResponseTime, errorMessage } = await handleAIResponse(input);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: newMessage.id + 1,
        text: errorMessage || result,
        isUser: false,
        responseTime: calculatedResponseTime,
      },
    ]);
  };

  return (
    <Main>
      <DemoIntro messages={messages} />
      <Body>
        <SpeedInsights />
        <Analytics />
        <Chat
          messages={messages}
          loading={loading}
          handleCopyMessage={handleCopyMessage}
          handleReload={handleReload}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          onClose={handleClose}
          autoHideDuration={2000}
          message="Copied to clipboard"
        />
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          input={input}
          textareaRef={textareaRef}
          isChrome={isChrome}
        />
      </Body>
      <BrowserException isChrome={isChrome} />
    </Main>
  );
}
