import Layout from '../components/MyLayout';
import Link from 'next/link';
import Markdown from 'react-markdown';

function getPosts() {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js' },
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome' },
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT' }
  ];
}

// No effect for nested component

/*
  As you have witnessed, CSS rules have no effect on elements inside of a child
  component.
  This feature of styled-jsx helps you to manage styles for bigger apps.
  In that case, you need to style the child component directly. And in our
  particular case, we need to do this for our Link component:
*/
const PostLink = ({ post }) => (
  <li>
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      <a>{post.title}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: 'Arial';
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
);
// Otherwise, you could use global selectors.
// https://github.com/zeit/styled-jsx#one-off-global-selectors

export default function Blog() {
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        {getPosts().map(post => (
          <PostLink key={post.id} post={post} />
        ))}
      </ul>
      <Markdown
        source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
        `}
      />
      <style jsx>{`
        h1, a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
      <style jsx global>{`
        .markdown {
          font-family: 'Arial';
        }

        .markdown a {
          text-decoration: none;
          color: blue;
        }

        .markdown a:hover {
          opacity: 0.6;
        }

        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
    </Layout>
  );
}

/*
  Global Styles Work

  Yep that worked well. It worked, because our styles applied globally.
  While this feature can be incredibly handy, we always recommend trying to write
  scoped styles (without the global prop).
  Still, this is a great solution over normal style tags. With styled-jsx all
  necessary prefixing and CSS validation is done inside a babel plugin, so there
  is no additional runtime overhead.
*/

// https://github.com/zeit/next.js#css
