import React from 'react';
import moment from 'moment';
import { NoteBody } from '../config/types';

/**
 * Format created date
 * @param date
 * @returns string
 */
const createdDate = (date: string): string => {
  const d = moment(date).format('MMMM Do, YYYY');
  const t = moment(date).format('h:mma');

  return `${d} at ${t}`;
};
const NoteDetail: React.FC<{ note: NoteBody }> = ({ note }) => {
  return (
    <div className="p-2">
      <h3 className="font-light text-xs mb-2 text-gray-600 text-center">
        {createdDate(note.created_at)}
      </h3>
      <h2 className="text-xl font-bold mb-2">{note.title}</h2>
      <p className="mb-4 whitespace-pre">{note.description}</p>
    </div>
  );
};

export default NoteDetail;
