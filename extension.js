import GObject from 'gi://GObject';
import St from 'gi://St';

import { Extension, gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const daysInKannada = [
    "ಭಾನುವಾರ",
    "ಸೋಮವಾರ",
    "ಮಂಗಳವಾರ",
    "ಬುಧವಾರ",
    "ಗುರುವಾರ",
    "ಶುಕ್ರವಾರ",
    "ಶನಿವಾರ",
];

const Indicator = GObject.registerClass(
    class Indicator extends PanelMenu.Button {
        _init() {
            super._init(0.0, _('My Shiny Indicator'));

            this.add_child(new St.Label({
                text: daysInKannada[new Date().getDay()],
                style_class: 'date-label'
            }));

        }
    });

export default class IndicatorExampleExtension extends Extension {
    _indicator = null;

    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }

    disable() {
        if (this._indicator) {
            this._indicator.destroy();
            this._indicator = null;
        }
    }
}
