import React from "react";
import {
  XMarkIcon,
  PaperClipIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import Dropzone from "react-dropzone";

export const isValidMessage = (str) => {
  if (!str || str.trim().length === 0) return false;
  else return true;
};

const MessageFormUI = ({
  attachment,
  setAttachment,
  message,
  handleChange,
  handleSubmit,
  appendText,
  handleKeyDown,
}) => {
  const [preview, setPreview] = useState("");

  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            alt="preview"
            src={preview}
            onLoad={() => URL.revokeObjectURL(preview)}
            style={{ width: "40px" }}
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("");
              setAttachment("");
            }}
          />
        </div>
      )}
      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
          />
        </div>
        {appendText && (
          <input
            className="message-form-assist"
            type="text"
            disabled="disabled"
            value={`${message} ${appendText}`}
          />
        )}
        <div className="message-form-icons">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => {
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>
          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              if (attachment === "" && !isValidMessage(message)) return false;

              handleSubmit();
              setPreview("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageFormUI;
