import React, { ComponentType } from 'react';

const UiLayoutOneColumn: React.FC<{
  Header?: ComponentType;
  Navigator?: ComponentType;
  Content?: ComponentType;
  Footer?: ComponentType;
}> = (props) => {
  return (
    <>
      <div className="page-wrapper">
        <div className="ui_one_column">
          <div className="ui_one_column_container">
            <header>
              <div className="ui_one_column_header">
                <>{props.Header ?? null}</>
              </div>
              <div className="ui_one_column_navigator">
                <>{props.Navigator ?? null}</>
              </div>
            </header>

            <main>
              <div className="ui_one_column_content">
                <>{props.Content ?? null}</>
              </div>
            </main>
            <footer>
              <div className="ui_one_column_footer mt-5">
                <>{props.Footer ?? null}</>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiLayoutOneColumn;
