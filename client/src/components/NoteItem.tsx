import React from 'react';
import { NoteBody } from '../config/types';

type NoteItemProps = {
  note: NoteBody;
  onClick: () => void;
  isSelected: boolean;
};

const NoteItem: React.FC<NoteItemProps> = ({ note, onClick, isSelected }) => {
  return (
    <div
      className={`p-2 my-1 hover:bg-gray-100 rounded-lg cursor-pointer border ${
        isSelected ? 'bg-gray-100 border-gray-100' : ''
      }`}
      onClick={onClick}
    >
      <h2 className="text-md font-normal mb-2 truncate">{note.title}</h2>
      <p className="text-xs text-gray-600 truncate">{note.description}</p>
    </div>
  );
};

export default NoteItem;
