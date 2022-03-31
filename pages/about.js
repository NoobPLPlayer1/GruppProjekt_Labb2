
import { withPageAuthRequired } from "@auth0/nextjs-auth0";


const About = () => {
    return (
        <div>
            <h1>About</h1>
            
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro reiciendis ea quibusdam nemo nobis hic iure quos odio corporis, laudantium animi laborum voluptatem quia, veniam fuga aperiam officia sequi!</p>
        </div>
    );
}

export const getServerSideProps=withPageAuthRequired();