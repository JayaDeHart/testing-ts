import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import userEvent from '@testing-library/user-event';

describe('Todo', () => {
  it('renders a label', () => {
    render(<Home />);
    expect(screen.getByText('Task:')).toBeInTheDocument();
  });

  it('can create a new todo item', async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByTestId('todo-input'), 'do something');
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('do something')).toBeInTheDocument();
  });

  it('can mark items as completed', async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByTestId('todo-input'), 'do something');
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByText('do something')).toHaveStyle(
      'textDecoration: line-through'
    );
  });

  it('can delete items from the list', async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByTestId('todo-input'), 'do something');
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Delete'));
    expect(screen.queryByText('do something')).not.toBeInTheDocument();
  });
});
