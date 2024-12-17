import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { IProduct } from "../../../../interfaces/api.products.res.type";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  addToCompare,
  ICompare,
  replaceCompare,
} from "../../../../redux/features/compare/compare.slice";

const AddToCompare: FC<IProduct> = ({ id, categoryId }) => {
  const dispatch = useAppDispatch();
  const [showSuccessModal, setSuccessModal] = useState<boolean>(false);
  const [showConflictModal, setShowConflictModal] = useState<boolean>(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState<boolean>(false);
  const [showLimitExtendedModal, setShowLimitExtendedModal] =
    useState<boolean>(false);

  const comparePayload: ICompare = {
    categoryId,
    productId: id,
  };

  function handleAddToCompare() {
    try {
      dispatch(addToCompare(comparePayload));
      setSuccessModal(true);
    } catch (error: any) {
      if (error?.message === "category_conflict") {
        setShowConflictModal(true);
      } else if (error.message === "product_exist") {
        setShowDuplicateModal(true);
      } else if (error.message === "limit_extended") {
        setShowLimitExtendedModal(true);
      }
    }
  }

  const handleReplaceCompareList = () => {
    dispatch(replaceCompare([comparePayload]));
    setShowConflictModal(false);
    setSuccessModal(true);
  };

  function handleGotoCompare() {
    console.log("hello");
  }

  return (
    <>
      <Button
        onClick={handleAddToCompare}
        variant="outlined"
        size="large"
        color="danger"
      >
        Compare
      </Button>

      {/* success */}
      <Modal
        title="Added to Compare List"
        centered
        open={showSuccessModal}
        okType="danger"
        cancelText="Add more"
        onOk={handleGotoCompare}
        okText="Compare now"
        onCancel={() => setSuccessModal(false)}
      >
        <p>The product has been successfully added to your comparison list.</p>
      </Modal>

      {/* category conflict modal */}
      <Modal
        title="Comparison Restricted"
        centered
        open={showConflictModal}
        okType="danger"
        onOk={handleReplaceCompareList}
        okText="Replace with the new category"
        onCancel={() => setShowConflictModal(false)}
      >
        <p>
          Comparison is limited to items from the same category. Please update
          your selection to continue.
        </p>
      </Modal>

      {/* duplicate modal */}
      <Modal
        title="Product Already in Compare List"
        centered
        open={showDuplicateModal}
        okType="danger"
        onOk={handleGotoCompare}
        okText="Compare now"
        onCancel={() => setShowDuplicateModal(false)}
      >
        <p>
          This product is already added to your comparison list. Please select a
          different item to compare.
        </p>
      </Modal>

      {/* limit extended modal */}
      <Modal
        title="Compare Limit Reached"
        centered
        open={showLimitExtendedModal}
        okType="danger"
        onOk={handleGotoCompare}
        okText="Compare now"
        onCancel={() => setShowLimitExtendedModal(false)}
      >
        <p>
          You can only compare up to 3 items at a time. Please remove an item to
          add a new one.
        </p>
      </Modal>
    </>
  );
};

export default AddToCompare;
