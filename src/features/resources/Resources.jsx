import { Breadcrumb, Button } from "antd";
import React from "react";
import { listFolders, downloadFile } from "../../app/firebase/storage";
import "./filemanager.css";
import { BiArrowBack } from "react-icons/bi";

const Resources = () => {
  const [currentPath, setCurrentPath] = React.useState("resources");
  const [currentFiles, setCurrentFiles] = React.useState([]);
  const [currentFolders, setCurrentFolders] = React.useState([]);

  React.useEffect(() => {
    listFolders(currentPath).then((res) => {
      setCurrentFolders(res.folders);
      setCurrentFiles(res.files);
    });
  }, [currentPath]);

  function getFileExtension(filename) {
    return filename.split(".").pop();
  }

  return (
    <>
      <div style={{ margin: "50px" }}>
        <div className="filemanager">
          <Breadcrumb separator="  >  ">
            {currentPath.split("/").map((item, index) => {
              return (
                <Breadcrumb.Item
                  style={{}}
                  key={index}
                  onClick={() => {
                    if (index === 0) {
                      setCurrentPath("resources");
                    } else {
                      setCurrentPath(
                        currentPath
                          .split("/")
                          .slice(0, index + 1)
                          .join("/")
                      );
                    }
                  }}
                >
                  <a>{item}</a>
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
          <Button
            onClick={() =>
              setCurrentPath(currentPath.split("/").slice(0, -1).join("/"))
            }
            icon={<BiArrowBack size={15} />}
          ></Button>

          <ul className="data animated">
            {currentFolders.map((folder, ind) => (
              <li
                key={ind}
                className="folders"
                onClick={() => setCurrentPath(currentPath + "/" + folder)}
              >
                <span className="icon folder full"></span>
                <span className="name">{folder}</span>
              </li>
            ))}
            {currentFiles.map((file) => (
              <>
                <li
                  className="files"
                  onClick={() => {
                    downloadFile(currentPath + "/" + file).then((url) => {
                      window.open(url, "popup", "width=1200,height=800");
                    });
                  }}
                >
                  <span className={`icon file f-${getFileExtension(file)}`}>
                    {getFileExtension(file)}
                  </span>
                  <span className="name">{file}</span>
                </li>
              </>
            ))}
          </ul>

          <div className="nothingfound" style={{ display: "none" }}>
            <div className="nofiles"></div>
            <span>No files here.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
