import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add CSS for snow theme
import { Delta } from 'quill/core';
import { applyDiffStyles, deltaToHTML, getStyledQuillDiff } from '@/lib/quill-utils';

export default function TextDiffEditor() {
    const { quill: quill1, quillRef: quillRef1 } = useQuill();
    const { quill: quill2, quillRef: quillRef2 } = useQuill();
    const { quill: quillDiff, quillRef: quillRefDiff } = useQuill();

    const [diffHtml, setDiffHtml] = useState(deltaToHTML(quill1?.getContents()));

    const handleDiff = () => {
        if (quill1 && quill2 && quillDiff) {
          // const diffDelta = getStyledQuillDiff(quill1, quill2)
          // console.log("handling idff", quill1.getContents(), diffDelta);
          // quillDiff.setContents(diffDelta); // Apply styled diff
        }
    };

    useEffect(() => {
      if (quill1) {
        quill1.on("text-change", (delta, oldDelta, source) => {
          const deltaHtml = deltaToHTML(quill1.getContents());
          setDiffHtml(deltaHtml);
        })
      }
    }, [quill1])


    return (
        <div>
          <div>
            <p>Test HTML</p>
            <div dangerouslySetInnerHTML={{ __html: diffHtml }}></div>
          </div>
            <div ref={quillRef1} style={{ height: 200 }} />
            <div ref={quillRef2} style={{ height: 200 }} />
            <button onClick={handleDiff}>Compute Difference</button>
            <div ref={quillRefDiff} style={{ height: 200, marginTop: 20 }} />
        </div>
    );
}
