import React from 'react';

import {Button} from './components/ui/button';

export default function ErrorPage() {
  return (
    <div>
      <h1>Oops</h1>
      <p>Something went wrong</p>
      <a href="/">
        <Button>
          Go Back
        </Button>
      </a>
    </div>
  )
}
