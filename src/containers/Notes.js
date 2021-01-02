import React, {useState, useRef, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {API, Storage } from "aws-amplify";
import {onError} from "../libs/errorLib";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Notes.css"
import { Form } from "react-bootstrap";
import { s3Upload, s3Delete } from "../libs/awsLib";
const Notes = () => {
  const file = useRef(null);
  const {id} = useParams();
  const history = useHistory();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
      const loadNote = () => {
        return API.get("notes", `/notes/${id}`);
      }

      const onLoad = async () => {
          try {
            const note = await loadNote();
            const { content, attachment } = note;
            if (attachment) {
              note.attachmentUrl = await Storage.vault.get(attachment);
            }
            setContent(content);
            setNote(note);
          } catch (e) {
            onError(e);
          }
      }
      onLoad();
  }, [id]);

  const validateForm = () => {
    return content.length > 0;
  }

  const formatFileName = (str) => {
    return str.replace(/^\w+-/, "");
  }

  const handleFileChange = (event) => {
    file.current = event.target.files[0];
  }


  const saveNote = (note) => {
    return API.put("notes", `/notes/${id}`, {
      body: note
    });
  }


  const handleSubmit = async (event) => {
    let attachment;
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
        if (file.current) {
          attachment = await s3Upload(file.current);
        }

        await saveNote({
          content,
          attachment: attachment || note.attachment
        });
        history.push("/");
    } catch (e) {
      onError(e);
    }
  }

  const deleteNote = () => {
    return API.del("notes", `/notes/${id}`);
  }

  const handleDelete = async (event) => {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure to delete this note?"
      );

      if (!confirmed) {
        return;
      }
      setIsDeleting(true);

      try {
        await deleteNote();

        if (note.attachment) {
          await s3Delete(note.attachment);
        }
      
        history.push("/");
      } catch (e) {
        onError(e);
        setIsDeleting(false);
      }
  }


  return (
    <div className="Notes">
      {note && (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="content">
              <Form.Control as="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              >
              </Form.Control>
              <Form.Group controlId="file">
                <Form.Label>Attachment</Form.Label>
                {note.attachment && (
                  <p>
                    <a target="_blank"
                    rel="noopener noreferrer"
                    href={note.attachmentUrl}
                    >
                      {formatFileName(note.attachment)}
                    </a>
                  </p>

                )}
                <Form.Control onChange={handleFileChange} type="file" />
              </Form.Group>
            </Form.Group>
            <LoaderButton
              block
              size="lg"
              type="submit"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              Save
            </LoaderButton>
            <LoaderButton 
            block
            size="lg"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
            >
              Delete
            </LoaderButton>
          </Form>

      )}
    </div>
  );
}

export default Notes;