import React from 'react';
import { render, screen } from "@testing-library/react";
import Quote from "./Quote";

describe("when rendered with a `quote` and `author` prop", () => {
    it("should show the quote and author", () => {
        const props = {
            quote: "To be or not to be?",
            author: "Shakespeare"
        };

        render(<Quote {...props} />);
        expect(
            screen.getByText(new RegExp(props.quote, 'i'))
        ).toBeInTheDocument();
    });
});
