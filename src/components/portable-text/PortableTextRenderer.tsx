import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";

import styles from "./PortableTextRenderer.module.scss";

type PortableTextRendererProps = {
  value?: PortableTextBlock[];
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={styles.paragraph}>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className={styles.list}>{children}</ul>,
    number: ({ children }) => <ol className={styles.list}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className={styles.item}>{children}</li>,
    number: ({ children }) => <li className={styles.item}>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const isExternal = href.startsWith("http");

      return (
        <a
          className={styles.link}
          href={href}
          rel={isExternal ? "noreferrer noopener" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value?.length) {
    return null;
  }

  return <PortableText value={value} components={components} />;
}
