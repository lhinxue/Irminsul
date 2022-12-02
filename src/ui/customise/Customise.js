export default function Customise({ children, stylesheet }) {
    return (
        <>
            {children}
            <style className="stylesheet" dangerouslySetInnerHTML={{ __html: stylesheet }} ></style>
        </>
    )
}