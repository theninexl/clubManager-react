export const NotificationsBubble = ({ children,className }) => {
  return (
    <span className={`cm-o-notification-bubble ${className}`}>
      { children }
    </span>
  );
}