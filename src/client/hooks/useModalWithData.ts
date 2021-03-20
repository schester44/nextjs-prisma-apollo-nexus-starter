import { useState, useMemo, useCallback, FunctionComponent } from "react";
import { useModal } from "react-modal-hook";

const useModalWithData = <D>(modalFactory: (data: D | undefined) => FunctionComponent) => {
  const [modalData, setModalData] = useState<D>();
  const modalComponent = useMemo(() => modalFactory(modalData), [modalData]);
  const [_showModal, hideModal] = useModal(modalComponent, [modalData]);

  const showModal = useCallback((data: D) => {
    setModalData(data);
    _showModal();
  }, []);

  return [showModal, hideModal];
};

export default useModalWithData;
