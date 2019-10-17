// import React from 'react';
import MyLayout from '../components/MyLayout';
import marked from 'marked';
// v0: The module highlight.js will be used for each heavy module.
// import Highlight from 'react-highlight'

// v2: Dynamic import, You'll be able to find react-highlight in a separate bundle.
import dynamic from 'next/dynamic';

const Highlight = dynamic(() => import('react-highlight'));
// So highlight.js will be build to static/chunks/[rand-str].js as seperate bundle.

// marked.setOptions({
//   gfm: true,
//   tables: true,
//   breaks: true
// })
//
// export default function withPost(options) {
//   return class PostPage extends React.Component {
//     render() {
//       return (
//         <MyLayout>
//           <h1>{options.title}</h1>
//           <div>
//             <Highlight innerHTML>{marked(options.content)}</Highlight>
//           </div>
//         </MyLayout>
//       )
//     }
//   }
// }

export default function WithPost(options) {
  return class PostPage extends React.Component {
    renderMarkdown() {
      // If a code snippet contains in the markdown content
      // then use Highlight component
      if (/~~~/.test(options.content)) {
        return (
          <div>
            <Highlight innerHTML>{marked(options.content)}</Highlight>
          </div>
        );
      }

      // If not, simply render the generated HTML from markdown
      return <div dangerouslySetInnerHTML={{ __html: marked(options.content) }} />;
    }

    render() {
      return (
        <MyLayout>
          <h1>{options.title}</h1>
          {this.renderMarkdown()}
        </MyLayout>
      );
    }
  };
}

/*
  As you've seen, the app will download react-highlight in the client side when
  it's needed. That's the whole purpose of dynamic components. While it's
  loading, it will show a loading component.
*/
