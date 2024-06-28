import Quill, { Delta } from "quill/core";

export const deltaToHTML = (delta?: Delta) => {
  if (!delta) return ""
  let html = ""
  // Converts attributes object found inside the operation object in the delta to a string
  const attributesToString = (attributes: any) => {
    let style = ""
    Object.entries(attributes || {})
      .map(([key, val]) => {
        if (key === "bold") {
          if (val) {
            style += '"font-weight: bold;"'
          } else {
            style += '"font-weight: normal;"'
          }
        }
        if (key === "italic") {
          if (val) {
            style += '"font-style: italic;"'
          } else {
            style += '"font-style: normal;"'
          }
        }
        if (key === "underline") {
          if (val) {
            style += '"text-decoration: underline;"'
          } else {
            style += '"text-decoration: none;"'
          }
        }
        if (key === "strike") {
          if (val) {
            style += '"text-decoration: line-through;"'
          } else {
            style += '"text-decoration: none;"'
          }
        }
        else {
          style += `"${key}: ${val};"`;
        }
      })
    return style;

  }
  delta.ops.forEach(op => {
    if (op.insert) {
      if (typeof op.insert === 'string') {
        const insertedText = op.insert.replace(/\n/g, "<br>"); // Convert newlines to <br> for HTML
        // const insertedText = op.insert
        const style = attributesToString(op.attributes)
        html += `<span style=${style}>${insertedText}</span>`;

      } else if (typeof op.insert === 'object') {
        // Handle embedded objects (e.g., images)
        const key = Object.keys(op.insert)[0];
        const value = op.insert[key];
        if (key === 'image') {
          html += `<img src="${value}" alt="">`;
        }
      }
    }
  });
  return `<span>${html}</span>`;
}

export const deltaToText = (delta: Delta) => {
  let text = "";
  delta.ops.forEach((op) => {
    if (op.insert) {
      if (typeof op.insert === 'string') {
        text += op.insert;
      }
    }
  });
  return text;
}

export const applyDiffStyles = (originalDelta: Delta, currDelta: Delta, diffDelta: Delta): Delta => {
  const formattedDelta = new Delta();

  const originalText = deltaToText(originalDelta);;
  const newText = deltaToText(currDelta);;
  let oldCursor = 0;
  let newCursor = 0;
  diffDelta.ops.forEach((op) => {
    if (op.retain) {
      formattedDelta.retain(op.retain);
      // console.info("retain op", op.retain, oldCursor, op.retain)
      // TODO: Add support for other types
      if (typeof op.retain === "number") {
        const retained = originalText.substring(oldCursor, oldCursor + op.retain);
        formattedDelta.insert(retained);
        oldCursor += op.retain
        newCursor += op.retain
      }
    } else if (op.insert) {
      formattedDelta.insert(op.insert, { background: '#d1ffd1' }); // Light green for inserts
      // console.info("insert op", op.insert, newCursor, op.insert.length)
      // TODO: Add support for other types
      if (typeof op.insert === "string") {
        newCursor += op.insert.length
      }
    } else if (op.delete) {
      const deleted = originalText.substring(oldCursor, oldCursor + op.delete);
      // console.info("delete op", deleted, oldCursor, op.delete)
      formattedDelta.delete(op.delete); // Light red for deletes
      formattedDelta.insert(deleted, { background: '#ffd1d1' });
      oldCursor += op.delete;
    }
  });

  // Add the remaining text, because "Wow" and "wow" will not have a retain: 2 in the ops of their diff
  for (let i = newCursor; i < newText.length; i++) {
    formattedDelta.insert(newText[i]);
  }
  return formattedDelta;
};


export const getStyledQuillDiff = (delta1: Delta, delta2: Delta) => {
  const diff = delta1.diff(delta2); // Compute the difference

  // console.log("delta1", delta1, "detal2", delta2, "diff", diff);
  return applyDiffStyles(delta1, delta2, diff); // Apply styled diff
};