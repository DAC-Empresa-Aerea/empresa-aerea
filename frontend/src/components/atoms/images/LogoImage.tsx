export default function LogoImage({
    size = "",
  }: {
    size?: string;
  }) {
    return (
      <img
        src="/icon/favicon/favicon.ico"
        alt="Logo"
        className={`mx-auto mb-2 ${size}`}
      />
    );
  }