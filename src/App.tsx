import { useRef, useState } from "react";
import { isChrome } from "react-device-detect";
import { Form } from "./components/Form";
import { BrowserException } from "./components/BrowserException";
import { DemoIntro } from "./components/DemoIntro";
import { Chat } from "./components/Chat";
import { Body } from "./components/Body";
import { Main } from "./components/Main";

declare const window: any;

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustTextareaHeight();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
    }

    const newMessage = { text: input, isUser: true, responseTime: null };
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      return updatedMessages.length > 10 ? updatedMessages.slice(1) : updatedMessages;
    });
    setInput('');
    setLoading(true);
    const startTime = Date.now();

    setTimeout(async () => {
      try {
        const canCreate = await window.ai.canCreateTextSession();

        if (canCreate !== "no") {
          const session = await window.ai.createTextSession();
          const result = await session.prompt(input);

          const endTime = Date.now();
          const calculatedResponseTime = (endTime - startTime) / 1000;

          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, { text: result, isUser: false, responseTime: calculatedResponseTime }];
            return updatedMessages.length > 10 ? updatedMessages.slice(1) : updatedMessages;
          });

          session.destroy();
        } else {
          handleSessionError(startTime);
        }
      } catch (error) {
        handleSessionError(startTime, error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const handleSessionError = (startTime: number, error?: any) => {
    const endTime = Date.now();
    const calculatedResponseTime = (endTime - startTime) / 1000;
    const errorMessage = error
      ? "You run this code in a non-dev version browser. Please try using the dev version browser (Chrome Canary or Chrome Dev)."
      : "Sorry, I can't create a session right now. Please try again later.";

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, { text: errorMessage, isUser: false, responseTime: calculatedResponseTime }];
      return updatedMessages.length > 10 ? updatedMessages.slice(1) : updatedMessages;
    });
  };

  return (
    <Main>
      <DemoIntro messages={messages} />
      <Body>
        <Chat messages={messages} loading={loading} />
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
