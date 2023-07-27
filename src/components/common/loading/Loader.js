import React from "react";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

export const Loader = () => {
  const loading = useSelector((state) => {
    return state?.loading?.loading;
  });

  const isLoading = useSelector((state) => state.auth.isLoading);

  const styles = {
    margin: "auto",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
  };

  if (loading || isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#817e8152",
          top: 0,
        }}
      >
        {(loading || isLoading) && (
          <div>
            <ClipLoader
              css={styles}
              height={100}
              width={20}
              radius={100}
              margin={30}
              color={"#1a76d2"}
              loading={loading || isLoading}
            />
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};
