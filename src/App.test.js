import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Jest
jest.mock('axios');
// Vitest
//vi.mock('axios');

describe('App', () => {
  it('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: stories } })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    const items = await screen.findAllByRole('listitem');

    expect(items).toHaveLength(2);
  });

  it('fetches stories from an API and fails', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error())
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    const message = await screen.findByText(/Something went wrong/);

    expect(message).toBeInTheDocument();
  });

});
