const os = {
    try: (func, v) => {
        try {
            return func()
        } catch (error) {
            return v
        }
    }
}
export default os