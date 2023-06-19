import { render, screen} from "@testing-library/react"
import {Test} from "./test"

describe("Test", () =>{
    test("renders correctly", () => {
        render(<Test />);
        const textElement = screen.getByText("Test");
        expect(textElement).toBeInTheDocument()
    })
})
