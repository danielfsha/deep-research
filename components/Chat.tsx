"use client";

import { useRef, useState } from "react";

import { useChat } from "@ai-sdk/react";
import Spinner from "./Spinner";

export default function Chat() {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    reload,
    status,
    stop,
  } = useChat({});

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.role}: {m.content}
          <div>
            {m.experimental_attachments
              ?.filter((attachment) =>
                attachment?.contentType?.startsWith("image/")
              )
              .map((attachment, index) => (
                <img
                  key={`${m.id}-${index}`}
                  src={attachment.url}
                  alt={attachment.name}
                />
              ))}
          </div>
          {m.role === "user" && (
            <button
              onClick={() => handleDelete(m.id)}
              className="bg-gray-200 border border-1 border-gray-700 text-black px-2 py-1 rounded-sm"
            >
              Delete
            </button>
          )}
        </div>
      ))}

      {status === "submitted" && <Spinner />}

      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}

      <form
        onSubmit={(event) => {
          handleSubmit(event, {
            experimental_attachments: files,
          });

          setFiles(undefined);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2"
      >
        <input
          type="file"
          onChange={(event) => {
            if (event.target.files) {
              setFiles(event.target.files);
            }
          }}
          multiple
          ref={fileInputRef}
        />
        <input
          placeholder="enter message..."
          value={input}
          onChange={handleInputChange}
          className="px-3 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm "
        />
        <button
          onClick={
            status === "streaming" || status === "submitted"
              ? stop
              : handleSubmit
          }
          className="bg-gray-100 border border-[0.5px] shadow-sm rounded-md px-2 py-1 font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          type="button"
        >
          {status === "streaming" || status === "submitted" ? "Stop" : "Send"}
        </button>
      </form>
    </div>
  );
}
