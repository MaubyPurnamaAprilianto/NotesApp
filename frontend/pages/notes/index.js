import HeaderNotes from "@/components/layout/HeaderNotes";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  BookmarkIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [selectedNote, setSelectedNote] = useState(null); // State for selected note
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No token found.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError("Error fetching notes.");
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No token found.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("Error deleting note.");
    }
  };

  const handlePin = (id) => {
    const updatedNotes = notes
      .map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
      .sort((a, b) => b.pinned - a.pinned); // Move pinned notes to the top
    setNotes(updatedNotes);

    // Store pinned status in localStorage
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  useEffect(() => {
    // Load notes from localStorage
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <div>
      <HeaderNotes />
      <div className="min-h-screen bg-gray-100 text-black p-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {notes.map((note, index) => (
            <div
              key={note.id}
              onClick={() => handleNoteClick(note)} // Add click handler
              className={`bg-white p-6 rounded-lg shadow-lg relative cursor-pointer ${
                note.pinned ? "border-2 border-blue-500 z-10" : ""
              }`}
              style={{ order: note.pinned ? -index : index }} // Ensure pinned notes are at the top
            >
              <div className="absolute top-2 right-2">
                <Menu as="div" className="relative">
                  <Menu.Button
                    className="p-2 text-gray-500 hover:text-gray-900"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EllipsisVerticalIcon className="h-6 w-6" />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="p-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`flex items-center px-4 py-2 text-sm ${
                              active ? "bg-gray-100" : "text-gray-700"
                            } hover:bg-gray-100 w-full text-left`}
                            onClick={() => handlePin(note.id)}
                          >
                            <BookmarkIcon
                              className={`h-5 w-5 mr-2 ${
                                note.pinned ? "text-blue-500" : ""
                              }`}
                            />
                            {note.pinned ? "Unpin" : "Pin"}
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={`/notes/edit/${note.id}`}
                            className={`flex items-center px-4 py-2 text-sm ${
                              active ? "bg-gray-100" : "text-gray-700"
                            } hover:bg-gray-100 w-full text-left`}
                          >
                            <PencilSquareIcon className="h-5 w-5 mr-2" />
                            Edit
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`flex items-center px-4 py-2 text-sm ${
                              active ? "bg-gray-100" : "text-gray-700"
                            } hover:bg-gray-100 w-full text-left`}
                            onClick={() => handleDelete(note.id)}
                          >
                            <TrashIcon className="h-5 w-5 mr-2" />
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
              <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
              <p className="truncate max-w-xs">{note.content}</p>{" "}
              {/* Add truncation and max-width */}
            </div>
          ))}
        </div>
        {/* Add the create note button */}
        <Link
          href="/notes/create"
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
        >
          <PlusIcon className="h-8 w-8 stroke-2 stroke-white fill-white" />
        </Link>
        {isModalOpen && selectedNote && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={closeModal}
            ></div>
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl h-auto mx-4 md:mx-0 z-50">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 border border-black"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <h2 className="text-3xl font-bold mb-4">{selectedNote.title}</h2>
              <p className="text-lg mb-4">{selectedNote.content}</p>
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
