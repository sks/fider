import "./AdvancedSettings.page.scss";

import * as React from "react";

import { CurrentUser } from "@fider/models";
import { AdminBasePage } from "../components";
import { DisplayError, Textarea, Button, ButtonClickEvent } from "@fider/components";
import { Failure, actions, page } from "@fider/services";

interface AdvancedSettingsPageProps {
  user: CurrentUser;
  customCSS: string;
}

interface AdvancedSettingsPageState {
  customCSS: string;
  error?: Failure;
}

export class AdvancedSettingsPage extends AdminBasePage<AdvancedSettingsPageProps, AdvancedSettingsPageState> {
  public id = "p-admin-advanced";
  public name = "advanced";
  public icon = "star";
  public title = "Advanced";
  public subtitle = "Manage your site settings";

  constructor(props: AdvancedSettingsPageProps) {
    super(props);

    this.state = {
      customCSS: this.props.customCSS
    };
  }

  private save = async (e: ButtonClickEvent): Promise<void> => {
    const result = await actions.updateTenantAdvancedSettings(this.state.customCSS);
    if (result.ok) {
      page.refresh();
    } else {
      this.setState({ error: result.error });
    }
  };

  public content() {
    return (
      <div className="ui form">
        <DisplayError fields={["customCSS"]} error={this.state.error} />
        <div className="field">
          <label htmlFor="custom-css">Custom CSS</label>
          <Textarea
            id="custom-css"
            disabled={!this.props.user.isAdministrator}
            onChange={e => this.setState({ customCSS: e.currentTarget.value })}
            value={this.state.customCSS}
            minRows={10}
          />
          <p className="info">
            Custom CSS allows you to change the look and feel of Fider so that you can apply your own branding.
            <br />
            This is a powerful and flexibe feature, but requires basic understanding of{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS">CSS</a>.
          </p>
          <div className="info">
            You can avoid some issues by following these recommendations:
            <ul>
              <li>
                <strong>Avoid nested selectors</strong>: Fider might change the structure of the HTML at any time, and
                it's likely that such changes would invalidate some rules.
              </li>
              <li>
                <strong>Keep it short</strong>: Customize only the essential. Avoid changing the style or structure of
                the entire site.
              </li>
            </ul>
          </div>
        </div>
        {this.props.user.isAdministrator && (
          <div className="field">
            <Button color="positive" onClick={this.save}>
              Save
            </Button>
          </div>
        )}
      </div>
    );
  }
}
