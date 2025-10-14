import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AboutMe from './AboutMe';

describe('AboutMe', () => {
  it('shows path and query parameters', () => {
    render(
      <MemoryRouter initialEntries={['/about/1/about-me/3?id=1&name=yan']}>
        <Routes>
          <Route path="/about/:aboutId/about-me/:aboutMeId" element={<AboutMe />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('About Me: User ID: 3')).toBeInTheDocument();
    expect(screen.getByText('Query: ID=1 name=yan')).toBeInTheDocument();
  });
});
