---
title: Unit testing
author: [Vera Scheunert]
date: 2023-06-12
---

## Unit testing

react-testing-library

---

**What is unit testing?**

--

**Definition**

Unit testing is the process of **testing individual components of code**, often called units, to ensure that they work as intended.

---

Why unit testing?

- Catch bugs early
- Improve the quality of code
- Facilitate refactoring and code maintenance
- Increase developer confidence
  x

---

What to test?

- Inputs & outputs
- Edge cases
- Error handling
- Components

--

What not to test?

- Third-party code
- External APIs,
- User flows (e2e test)

---

Tools for unit testing in JavaScript

---

Vitest

```
import { test } from 'vitest';

function add(a, b) {
    return a + b;
}

test('add function', (t) => {
    expect(add(2, 2)).toEqual(4);
    t.is(add(0, 0), 0);
});

```

---

React-testing-library

```
import React from 'react';
import { render, screen } from '@testing-library/react';

function Greeting({ name }) {
    return <div>Hello, {name}!</div>;
}

test('Greeting component', () => {

    render(<Greeting name="Alice" />);

    const greetingElement = screen.getByText(/hello, alice/i);

    expect(greetingElement).toBeInTheDocument();
});

```
