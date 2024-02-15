import { memo } from 'react';
import isEqual from 'react-fast-compare';

interface Iprops {
  text: String;
  size?: Number;
  className?: string | undefined;
}
const Component = (props: Iprops) => {
  const { text, className } = props;
  return (
    <p className="stroke">
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 700 72">
        <text x="0" y="70">
          {text}
        </text>
      </svg>
    </p>
  );
};
export const TextStroke = memo(Component, isEqual);
