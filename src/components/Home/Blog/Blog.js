import React, { useEffect, useState } from 'react'
import './Blog.css'
import { getBlog } from '../../../utils/getBlog'

const Blog = () => {
    const [blog, setBlog] = useState({});
    useEffect(() => {
        const getData = async () => {
            const blog_data = await getBlog();
            setBlog(blog_data[0].node);
        }
        getData();
    }, [])

    if (blog && Object.keys(blog).length === 0) {
        return <div>loading...</div>
    }

    return (
        <div className="blog-container">
            <div className="blog">
                <h1>Our Story</h1>
                <div className="blog-img-container">
                    <img src={blog.articles.edges[0].node.image.url} alt="" />
                    <div className="blog-excerpt">
                        "{blog.articles.edges[0].node.excerpt}"
                        <p>- {blog.articles.edges[0].node.authorV2.name}</p>
                        <button>Read More</button>
                    </div>         
                </div>  
            </div> 
        </div>
    )
}

export default Blog