import React from 'react';
import { api } from '../api';
import { NoteBody } from '../config/types';
import { h } from '../helpers';

type NoteActionsProps = {
  note: NoteBody;
  onDeleteSuccess: () => void;
  onCreateTrigger: () => void;
  onEditTrigger: () => void;
};

const NoteActions: React.FC<NoteActionsProps> = ({
  note,
  onDeleteSuccess,
  onCreateTrigger,
  onEditTrigger,
}) => {
  /**
   * Handle delete note action request
   * @param noteId
   * @returns
   */
  async function deleteNote(noteId: string) {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await api.notes.remove(noteId);
      h.general.alert('success', { message: 'Note successfully deleted' });
      onDeleteSuccess();
    } catch (error) {
      h.general.alert('error', { message: 'Something went wrong.' });
    }
  }

  return (
    <div
      className="flex justify-between items-center bg-gray-100 p-2"
      style={{ height: '58px' }}
    >
      <div>
        <button
          className="bg-blue-500 text-white px-3 py-2 text-xs rounded-md mr-2 hover:bg-blue-700"
          onClick={() => onCreateTrigger()}
        >
          Create new note
        </button>
      </div>
      <div>
        <button
          className="bg-blue-500 text-white px-3 py-2 text-xs rounded-md mr-2 hover:bg-blue-700"
          onClick={() => onEditTrigger()}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-2 text-xs rounded-md hover:bg-red-700"
          onClick={() => deleteNote(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteActions;
