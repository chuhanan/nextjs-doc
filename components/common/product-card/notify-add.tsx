function NotifyAdd(props) {
  const { getLangMsg, getBtn, onCancel } = props;
  return (
    <div className="flex items-center justify-center flex-row">
      <div className="enki-button-label-xs text-white !leading-[18px]">{getLangMsg()}</div>
      <div className="flex-shrink-0 ml-2.5" onClick={onCancel}>
        {getBtn()}
      </div>
    </div>
  );
}

export default NotifyAdd;
