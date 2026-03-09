import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import DataForm from '../components/DataForm';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
});

test('submits name, clears input and calls onDataAdded', async () => {
  const onDataAdded = jest.fn();
  render(<DataForm onDataAdded={onDataAdded} />);

  const input = screen.getByPlaceholderText('Enter a name');

  await act(async () => {
    await userEvent.type(input, 'Charlie');
  });

  const button = screen.getByRole('button', { name: /add data/i });
  await act(async () => {
    await userEvent.click(button);
  });

  expect(global.fetch).toHaveBeenCalled();

  await waitFor(() => expect(onDataAdded).toHaveBeenCalled());
  await waitFor(() => expect(input).toHaveValue(''));
});
