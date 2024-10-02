import Content from "./Content"
import Header from "./Header"

const index = () => {
    
    return (
        <section className="py-10 h-screen w-screen flex flex-col justify-between">
            <Header/>
            <Content/>
        </section>
    )
}

export default index