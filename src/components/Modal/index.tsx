import React, { useEffect } from "react";
import {
  CloseButton,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "./styles";

interface InnerModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
interface ModalProps extends InnerModalProps {
  isOpen: boolean;
}

const ModalInner: React.FC<InnerModalProps> = ({
  onClose,
  title,
  children,
}) => {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalBackdrop>
  );
};

const Modal: React.FC<ModalProps> = ({ isOpen, ...props }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return <ModalInner {...props} />;
};

export default Modal;
