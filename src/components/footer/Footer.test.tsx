import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe(('footer tests'), () => {
    test('check if movies is rendered', () => {
        render(<Footer />);
        const movies = screen.getByText('Movies');
        expect(movies).toBeInTheDocument();
    });
    test('check if address is rendered', () => {
        render(<Footer />);
        const address = screen.getByText('Address: 1169 Sofia Center, Sofia');
        expect(address).toBeInTheDocument();
    });
    test('check if the phone number is rendered', () => {
        render(<Footer />);
        const phoneNumber = screen.getByText('02 99 39 39');
        expect(phoneNumber).toBeInTheDocument();
    });
    test('check if the email is rendered', () => {
        render(<Footer />);
        const email = screen.getByText('movies@movies.com');
        expect(email).toBeInTheDocument();
    });
});
