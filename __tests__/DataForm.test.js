import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import DataForm from '../components/DataForm';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
});

test('submits name, clears input and calls onSuccess', async () => {
  const onSuccess = jest.fn();
  render(<DataForm onSuccess={onSuccess} />);

  const input = screen.getByPlaceholderText('Enter a name');

  await act(async () => {
    await userEvent.type(input, 'Charlie');
  });

  const button = screen.getByRole('button', { name: /add data/i });
  await act(async () => {
    await userEvent.click(button);
  });

  expect(global.fetch).toHaveBeenCalled();

  await waitFor(() => expect(onSuccess).toHaveBeenCalled());
  await waitFor(() => expect(input).toHaveValue(''));
});
