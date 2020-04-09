'use strict';

/**
 * @ngdoc service
 * @name nethvoiceWizardUiApp.GenericPhoneService
 * @description
 * # GenericPhoneService
 * Service in the nethvoiceWizardUiApp.
 */

angular.module('nethvoiceWizardUiApp')
  .service('GenericPhoneService', function (GenericPhoneUtilsService) {

    this.map = function (variables) {

      let softkey_count = parseInt(variables.cap_softkey_count),
          softkey_type_blacklist = variables.cap_softkey_type_blacklist,
          linekey_count = parseInt(variables.cap_linekey_count),
          linekey_type_blacklist = variables.linekey_type_blacklist,
          expmodule_count = parseInt(variables.cap_expmodule_count),
          expkey_count = parseInt(variables.cap_expkey_count),
          expkey_type_blacklist = variables.cap_expkey_type_blacklist,
          hidden_date_formats = variables.cap_date_format_blacklist,
          hidden_dss_transfer = variables.cap_dss_transfer_blacklist,
          hidden_ldap_tls = variables.cap_ldap_tls_blacklist

      return {
        "general": {
          "settings": true,
          "password": true,
          "hidden_dateformat": hidden_date_formats
        },
        "preferences": {
          "ringtone": true,
          "display": true,
          "wallpaper": true,
          "screensaver": true,
          "hidden_dsstransfer": hidden_dss_transfer
        },
        "network": {
          "ldap": true,
          "vlan": false,
          "hidden_ldap_tls": hidden_ldap_tls
        },
        "provisioning": {
          "provisioning": true
        },
        "softKeys":  {
          "intervals": [
            {
              "start": 1,
              "end": softkey_count
            }
          ],
          "hidden_types": softkey_type_blacklist,
          "hidden_variables": ""
        },
        "lineKeys": {
          "intervals": [
            {
              "start": 1,
              "end": linekey_count
            }
          ],
          "hidden_types": linekey_type_blacklist,
          "hidden_variables": ""
        },
        "expansionKeys":  {
          "modules": expmodule_count,
          "module_keys_count": expkey_count,
          "intervals": [
            {
              "start": 1,
              "end": expkey_count,
            }
          ],
          "hidden_types": expkey_type_blacklist,
          "hidden_variables": ""
        }
      }
    }

    this.preferences = function (modelMap) {

      if (!(modelMap.general.settings || modelMap.general.password)) {
        return;
      }

      var settingsItems = []
      var passwordItems = []

      if (modelMap.general.settings) {
        settingsItems = [
          {
            "variable": "ntp_server",
            "description": "NTP server address",
            "type": "input"
          },
          {
            "variable": "provisioning_freq",
            "description": "Provisioning scheduling",
            "type": "list",
            "options": [
              {
                "text": "everyday",
                "value": "everyday"
              },
              {
                "text": "never_prov_freq",
                "value": "never"
              }
            ]
          },
          {
            "variable": "dss_transfer",
            "description": "Line keys transfer mode",
            "type": "list",
            "options": [
              {
                "text": "New Call",
                "value": "verify"
              },
              {
                "text": "Attended Transfer",
                "value": "attended"
              },
              {
                "text": "Blind Transfer",
                "value": "blind"
              }
            ]
          },
          {
            "variable": "language",
            "description": "Phone language",
            "type": "list",
            "options": GenericPhoneUtilsService.getLanguages()
          },
          {
            "variable": "timezone",
            "description": "Time zone",
            "type": "list",
            "options": GenericPhoneUtilsService.getTimeZones()
          },
          {
            "variable": "tonezone",
            "description": "Tone zone",
            "type": "list",
            "options": GenericPhoneUtilsService.getToneZones()
          },
          {
            "variable": "time_format",
            "description": "Time format",
            "type": "list",
            "options": [
              {
                "text": "12-hour",
                "value": "12"
              },
              {
                "text": "24-hour",
                "value": "24"
              }
            ]
          },
          {
            "variable": "date_format",
            "description": "Date format",
            "type": "list",
            "options": GenericPhoneUtilsService.getDateFormat()
          }
        ]
      }

      if (modelMap.general.password) {
        passwordItems = [
          {
            "variable": "adminpw",
            "description": "Admin password",
            "type": "password"
          },
          {
            "variable": "userpw",
            "description": "User password",
            "type": "password"
          }
        ]
      }

      return {
        "name": "Preferences",
        "items": settingsItems.concat(passwordItems)
      }
    }

    // this.preferences_OLD = function (modelMap) {
     
    //   if (!(modelMap.preferences.ringtone || modelMap.preferences.display || modelMap.preferences.wallpaper || modelMap.preferences.screensaver)) {
    //     return;
    //   }

    //   var ringtoneItems = [];
    //   var displayItems = [];
    //   var wallpaperItems = [];
    //   var screensaverItems = [];

    //   if (modelMap.preferences.ringtone) {
    //     ringtoneItems = [
    //       {
    //         "variable": "default_ringtone",
    //         "description": "Default Ringtone",
    //         "type": "list",
    //         "options": [
    //           {
    //             "text": "Common",
    //             "value": "Common"
    //           },
    //           {
    //             "text": "Ring1",
    //             "value": "Ring1.wav"
    //           },
    //           {
    //             "text": "Ring2",
    //             "value": "Ring2.wav"
    //           },
    //           {
    //             "text": "Ring3",
    //             "value": "Ring3.wav"
    //           },
    //           {
    //             "text": "Ring4",
    //             "value": "Ring4.wav"
    //           },
    //           {
    //             "text": "Ring5",
    //             "value": "Ring5.wav"
    //           },
    //           {
    //             "text": "Ring6",
    //             "value": "Ring6.wav"
    //           },
    //           {
    //             "text": "Ring7",
    //             "value": "Ring7.wav"
    //           },
    //           {
    //             "text": "Ring8",
    //             "value": "Ring8.wav"
    //           },
    //           {
    //             "text": "Silent",
    //             "value": "Silent.wav"
    //           },
    //           {
    //             "text": "Splash",
    //             "value": "Splash.wav"
    //           },
    //         ]
    //       },
    //       {
    //         "variable": "ringtone_url", //// todo upload
    //         "description": "Ringtone URL",
    //         "type": "input"
    //       },
    //     ]
    //   }

    //   if (modelMap.preferences.display) {
    //     displayItems = [
    //       {
    //         "variable": "lcd_logo_mode",
    //         "description": "LCD Logo Mode",
    //         "type": "list",
    //         "options": [
    //           {
    //             "text": "Common",
    //             "value": "Common"
    //           },
    //           {
    //             "text": "Ring1",
    //             "value": "Ring1.wav"
    //           },
    //           {
    //             "text": "Ring2",
    //             "value": "Ring2.wav"
    //           },
    //           {
    //             "text": "Ring3",
    //             "value": "Ring3.wav"
    //           },
    //           {
    //             "text": "Ring4",
    //             "value": "Ring4.wav"
    //           },
    //           {
    //             "text": "Ring5",
    //             "value": "Ring5.wav"
    //           },
    //           {
    //             "text": "Ring6",
    //             "value": "Ring6.wav"
    //           },
    //           {
    //             "text": "Ring7",
    //             "value": "Ring7.wav"
    //           },
    //           {
    //             "text": "Ring8",
    //             "value": "Ring8.wav"
    //           },
    //           {
    //             "text": "Silent",
    //             "value": "Silent.wav"
    //           },
    //           {
    //             "text": "Splash",
    //             "value": "Splash.wav"
    //           },
    //         ]
    //       },
    //       {
    //         "variable": "lcd_logo_url",
    //         "description": "LCD Logo URL", //// todo upload
    //         "type": "input"
    //       },
    //       {
    //         "variable": "contrast",
    //         "description": "Contrast",
    //         "type": "list",
    //         "options": [
    //           {
    //             "text": "1",
    //             "value": "1"
    //           },
    //           {
    //             "text": "2",
    //             "value": "2"
    //           },
    //           {
    //             "text": "3",
    //             "value": "3"
    //           },
    //           {
    //             "text": "4",
    //             "value": "4"
    //           },
    //           {
    //             "text": "5",
    //             "value": "5"
    //           },
    //           {
    //             "text": "6",
    //             "value": "6"
    //           },
    //           {
    //             "text": "7",
    //             "value": "7"
    //           },
    //           {
    //             "text": "8",
    //             "value": "8"
    //           },
    //           {
    //             "text": "9",
    //             "value": "9"
    //           },
    //           {
    //             "text": "10",
    //             "value": "10"
    //           }
    //         ]
    //       },
    //       {
    //         "variable": "backlight_time",
    //         "description": "Backlight Time",
    //         "type": "list",
    //         "options": [
    //           {
    //             "text": "Always on",
    //             "value": "0"
    //           },
    //           {
    //             "text": "Always off",
    //             "value": "1"
    //           },
    //           {
    //             "text": "15s",
    //             "value": "15"
    //           },
    //           {
    //             "text": "30s",
    //             "value": "30"
    //           },
    //           {
    //             "text": "1min",
    //             "value": "60"
    //           },
    //           {
    //             "text": "2min",
    //             "value": "120"
    //           },
    //           {
    //             "text": "5min",
    //             "value": "300"
    //           },
    //           {
    //             "text": "10min",
    //             "value": "600"
    //           },
    //           {
    //             "text": "30min",
    //             "value": "1800"
    //           }
    //         ]
    //       },
    //       {
    //         "variable": "inactive_backlight_level",
    //         "description": "Inactive Backlight Level",
    //         "type": "list",
    //         "options": [
    //           {
    //             "text": "Off",
    //             "value": "0"
    //           },
    //           {
    //             "text": "Low",
    //             "value": "1"
    //           }
    //         ]
    //       },

    //       {
    //         "variable": "active_backlight_level",
    //         "description": "Active Backlight Level",
    //         "type": "list",
    //         "options": [
    //           {
    //             "text": "1",
    //             "value": "1"
    //           },
    //           {
    //             "text": "2",
    //             "value": "2"
    //           },
    //           {
    //             "text": "3",
    //             "value": "3"
    //           },
    //           {
    //             "text": "4",
    //             "value": "4"
    //           },
    //           {
    //             "text": "5",
    //             "value": "5"
    //           },
    //           {
    //             "text": "6",
    //             "value": "6"
    //           },
    //           {
    //             "text": "7",
    //             "value": "7"
    //           },
    //           {
    //             "text": "8",
    //             "value": "8"
    //           },
    //           {
    //             "text": "9",
    //             "value": "9"
    //           },
    //           {
    //             "text": "10",
    //             "value": "10"
    //           }
    //         ]
    //       }
    //     ];
    //   }

    //   if (modelMap.preferences.wallpaper) {
    //     wallpaperItems = [
    //       {
    //         "variable": "wallpaper",
    //         "description": "Wallpaper",
    //         "type": "list",
    //         "options": [
    //           {
    //             "text": "Default.jpg",
    //             "value": "Default.jpg"
    //           },
    //           {
    //             "text": "Default.png",
    //             "value": "Default.png"
    //           },
    //           {
    //             "text": "01.jpg",
    //             "value": "01.jpg"
    //           },
    //           {
    //             "text": "01.png",
    //             "value": "01.png"
    //           },
    //           {
    //             "text": "02.jpg",
    //             "value": "02.jpg"
    //           },
    //           {
    //             "text": "02.png",
    //             "value": "02.png"
    //           },
    //           {
    //             "text": "03.jpg",
    //             "value": "03.jpg"
    //           },
    //           {
    //             "text": "03.png",
    //             "value": "03.png"
    //           },
    //           {
    //             "text": "04.jpg",
    //             "value": "04.jpg"
    //           },
    //           {
    //             "text": "04.png",
    //             "value": "04.png"
    //           },
    //           {
    //             "text": "05.jpg",
    //             "value": "05.jpg"
    //           },
    //           {
    //             "text": "05.png",
    //             "value": "05.png"
    //           },
    //         ]
    //       },
    //       {
    //         "variable": "wallpaperurl", //// todo upload
    //         "description": "Wallpaper URL",
    //         "type": "input"
    //       },
    //     ];
    //   }

    //   if (modelMap.preferences.screensaver) {
    //     screensaverItems = [
    //       {
    //         "variable": "screensaver_mode",
    //         "description": "Screensaver Mode",
    //         "type": "list",
    //         "options": [
    //           {
    //             "text": "System",
    //             "value": "0"
    //           },
    //           {
    //             "text": "Custom",
    //             "value": "1"
    //           },
    //           {
    //             "text": "Server XML",
    //             "value": "2"
    //           },
    //           {
    //             "text": "Clock (VP59 / T58A)",
    //             "value": "0"
    //           },
    //           {
    //             "text": "Colours (VP59 / T58A)",
    //             "value": "1"
    //           },
    //           {
    //             "text": "Photo Frame (VP59 / T58A)",
    //             "value": "2"
    //           },
    //           {
    //             "text": "Photo Table (VP59 / T58A)",
    //             "value": "3"
    //           },
    //         ]
    //       },
    //       {
    //         "variable": "screesaver_url", //// todo upload
    //         "description": "Screensaver URL",
    //         "type": "input"
    //       },
    //       {
    //         "variable": "screensaver_wait_time",
    //         "description": "Screensaver Wait Time",
    //         "type": "list",
    //         "options": [
    //           {
    //             "text": "15s",
    //             "value": "15"
    //           },
    //           {
    //             "text": "30s",
    //             "value": "30"
    //           },
    //           {
    //             "text": "1min",
    //             "value": "60"
    //           },
    //           {
    //             "text": "2min",
    //             "value": "120"
    //           },
    //           {
    //             "text": "5min",
    //             "value": "300"
    //           },
    //           {
    //             "text": "10min",
    //             "value": "600"
    //           },
    //           {
    //             "text": "30min",
    //             "value": "1800"
    //           },
    //           {
    //             "text": "1h",
    //             "value": "3600"
    //           },
    //           {
    //             "text": "2h",
    //             "value": "7200"
    //           }
    //         ]
    //       }
    //     ];
    //   }

    //   return {
    //     "name": "Preferences",
    //     "items": ringtoneItems.concat(displayItems).concat(wallpaperItems).concat(screensaverItems)
    //   }
    // }

    this.network = function (modelMap) {

      var ldapItems = [];
      var vlanItems = [];

      if (modelMap.network.ldap) {
        ldapItems = [
          {
            "variable": "ldap_server",
            "description": "ldap_server",
            "type": "input"
          },
          {
            "variable": "ldap_port",
            "description": "ldap_port",
            "type": "input"
          },
          {
            "variable": "ldap_user",
            "description": "ldap_user",
            "type": "input"
          },
          {
            "variable": "ldap_password",
            "description": "ldap_password",
            "type": "password"
          },
          {
            "variable": "ldap_tls",
            "description": "ldap_tls",
            "type": "list",
            "options": [
              {
                "text": "ldap_tls_none",
                "value": "none"
              },
              {
                "text": "ldap_tls_starttls",
                "value": "starttls"
              },
              {
                "text": "ldap_tls_tls",
                "value": "ldaps"
              }
            ]
          },
          {
            "variable": "ldap_base",
            "description": "ldap_base",
            "type": "input"
          },
          {
            "variable": "ldap_name_filter",
            "description": "ldap_name_filter",
            "type": "input"
          },
          {
            "variable": "ldap_number_filter",
            "description": "ldap_number_filter",
            "type": "input"
          },
          {
            "variable": "ldap_name_attr",
            "description": "ldap_name_attr",
            "type": "input"
          },
          {
            "variable": "ldap_name_display",
            "description": "ldap_name_display",
            "type": "input"
          },
          {
            "variable": "ldap_mainphone_number_attr",
            "description": "ldap_mainphone_number_attr",
            "type": "input"
          },
          {
            "variable": "ldap_mobilephone_number_attr",
            "description": "ldap_mobilephone_number_attr",
            "type": "input"
          },
          {
            "variable": "ldap_otherphone_number_attr",
            "description": "ldap_otherphone_number_attr",
            "type": "input"
          }
        ];
      }

      if (modelMap.network.vlan) {
        vlanItems = [
          {
            "variable": "vlan_dhcp_enable",
            "description": "DHCP VLAN Discovery",
            "type": "list",
            "options": [
              {
                "text": "Disabled",
                "value": "0"
              },
              {
                "text": "Enabled",
                "value": "1"
              }
            ]
          },
          {
            "variable": "data_vlan_priority",
            "description": "VLAN Priority for PC port",
            "type": "list",
            "options": [
              {
                "text": "0 (lowest)",
                "value": "0"
              },
              {
                "text": "1",
                "value": "1"
              },
              {
                "text": "2",
                "value": "2"
              },
              {
                "text": "3",
                "value": "3"
              },
              {
                "text": "4",
                "value": "4"
              },
              {
                "text": "5",
                "value": "5"
              },
              {
                "text": "6",
                "value": "6"
              },
              {
                "text": "7 (highest)",
                "value": "7"
              }
            ]
          },
          {
            "variable": "data_vlan_id",
            "description": "VLAN ID for PC port",
            "type": "input"
          },
          {
            "variable": "data_vlan_enable",
            "description": "VLAN Enable for PC port",
            "type": "list",
            "options": [
              {
                "text": "Disabled",
                "value": "0"
              },
              {
                "text": "Enabled",
                "value": "1"
              }
            ]
          },
          {
            "variable": "voice_vlan_priority",
            "description": "VLAN Priority for Internet port",
            "type": "list",
            "options": [
              {
                "text": "0 (lowest)",
                "value": "0"
              },
              {
                "text": "1",
                "value": "1"
              },
              {
                "text": "2",
                "value": "2"
              },
              {
                "text": "3",
                "value": "3"
              },
              {
                "text": "4",
                "value": "4"
              },
              {
                "text": "5",
                "value": "5"
              },
              {
                "text": "6",
                "value": "6"
              },
              {
                "text": "7 (highest)",
                "value": "7"
              }
            ]
          },
          {
            "variable": "voice_vlan_id",
            "description": "VLAN ID for Internet port",
            "type": "input"
          },
          {
            "variable": "voice_vlan_enable",
            "description": "VLAN Enable for Internet port",
            "type": "list",
            "options": [
              {
                "text": "Disabled",
                "value": "0"
              },
              {
                "text": "Enabled",
                "value": "1"
              }
            ]
          }
        ];
      }

      return {
        "name": "ldap_phonebook_title",
        "items": ldapItems.concat(vlanItems)
      }
    }

    // this.provisioning = function (modelMap) {
    //   if (!modelMap.provisioning.provisioning) {
    //     return;
    //   }

    //   return {
    //     "name": "Provisioning",
    //     "items": [
    //       {
    //         "variable": "dhcp_enable",
    //         "description": "DHCP Active",
    //         "type": "list",
    //         "options": [
    //           {
    //             "text": "Off",
    //             "value": "0"
    //           },
    //           {
    //             "text": "On",
    //             "value": "1"
    //           }
    //         ]
    //       },
    //       {
    //         "variable": "weekly_enable",
    //         "description": "Weekly Provisioning",
    //         "type": "list",
    //         "options": [
    //           {
    //             "text": "Off",
    //             "value": "0"
    //           },
    //           {
    //             "text": "On",
    //             "value": "1"
    //           }
    //         ]
    //       },
    //       {
    //         "variable": "weekly_dayofweek",
    //         "description": "Weekly Provisioning Days of Week",
    //         "type": "input"
    //       },
    //       {
    //         "variable": "weekly_begin_time",
    //         "description": "Weekly Begin Time",
    //         "type": "time"
    //       },
    //       {
    //         "variable": "weekly_end_time",
    //         "description": "Weekly End Time",
    //         "type": "time"
    //       },
    //       {
    //         "variable": "pnp_enable",
    //         "description": "Plug and Play (PnP)",
    //         "type": "list",
    //         "options": [
    //           {
    //             "text": "Off",
    //             "value": "0"
    //           },
    //           {
    //             "text": "On",
    //             "value": "1"
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // }

    this.softKeys = function (modelMap) {

      // validate
      if (!modelMap.softKeys.intervals[0].end) {
        return;
      }

      return {
        "name": "Soft keys",
        "items": [
          {
            "description": "Soft key",
            "type": "loop",
            "keys": modelMap.softKeys,
            "data": {
              "items": [
                {
                  "variable": "softkey_type",
                  "description": "Type",
                  "type": "list",
                  "options": [
                    {
                      "text": "N/A",
                      "value": ""
                    },
                    {
                      "text": "Forward",
                      "value": "forward"
                    },
                    {
                      "text": "DND",
                      "value": "dnd"
                    },
                    {
                      "text": "Recall",
                      "value": "recall"
                    },
                    {
                      "text": "Pick up",
                      "value": "pick_up"
                    },
                    {
                      "text": "Speed Dial",
                      "value": "speed_dial"
                    },
                    {
                      "text": "Group Pickup",
                      "value": "group_pickup"
                    },
                    {
                      "text": "History",
                      "value": "history"
                    },
                    {
                      "text": "Menu",
                      "value": "menu"
                    },
                    {
                      "text": "Status",
                      "value": "status"
                    },
                    {
                      "text": "Prefix",
                      "value": "prefix"
                    },
                    {
                      "text": "LDAP",
                      "value": "ldap"
                    }
                  ]
                },
                {
                  "variable": "softkey_value",
                  "description": "Value",
                  "type": "input"
                },
                {
                  "variable": "softkey_label",
                  "description": "Label",
                  "type": "input"
                }
              ]
            }
          }
        ]
      }
    }

    this.lineKeys = function (modelMap) {

      // validate
      if (!modelMap.lineKeys.intervals[0].end) {
        return;
      }

      return {
        "name": "Line keys",
        "items": [
          {
            "description": "Line key",
            "type": "loop",
            "keys": modelMap.lineKeys,
            "data": {
              "items": [
                {
                  "variable": "linekey_type",
                  "description": "Type",
                  "type": "list",
                  "options": [
                    {
                      "text": "N/A",
                      "value": ""
                    },
                    {
                      "text": "Conference",
                      "value": "conference"
                    },
                    {
                      "text": "Forward",
                      "value": "forward"
                    },
                    {
                      "text": "Transfer",
                      "value": "transfer"
                    },
                    {
                      "text": "Hold",
                      "value": "hold"
                    },
                    {
                      "text": "DND",
                      "value": "dnd"
                    },
                    {
                      "text": "Recall",
                      "value": "recall"
                    },
                    {
                      "text": "Direct Pickup",
                      "value": "direct_pickup"
                    },
                    {
                      "text": "DTMF",
                      "value": "dtmf"
                    },
                    {
                      "text": "Voice Mail",
                      "value": "voice_mail"
                    },
                    {
                      "text": "Speed Dial",
                      "value": "speed_dial"
                    },
                    {
                      "text": "Line",
                      "value": "line"
                    },
                    {
                      "text": "BLF",
                      "value": "blf"
                    },
                    {
                      "text": "URL",
                      "value": "url"
                    },
                    {
                      "text": "Group Pickup",
                      "value": "group_pickup"
                    },
                    {
                      "text": "Multicast Paging",
                      "value": "multicast_paging"
                    },
                    {
                      "text": "Record",
                      "value": "record"
                    },
                    {
                      "text": "Prefix",
                      "value": "prefix"
                    },
                    {
                      "text": "Phone Lock",
                      "value": "phone_lock"
                    },
                    {
                      "text": "LDAP",
                      "value": "ldap"
                    }
                  ]
                },
                {
                  "variable": "linekey_value",
                  "description": "Value",
                  "type": "input"
                },
                {
                  "variable": "linekey_label",
                  "description": "Label",
                  "type": "input"
                }
              ]
            }
          }
        ]
      }
    }

    this.expansionKeys = function (modelMap) {

      // validate
      if (!modelMap.expansionKeys.modules || !modelMap.expansionKeys.intervals[0].end) {
        return;
      }

      return {
        "name": "Expansion Keys",
        "items": [
          {
            "description": "Expansion Key",
            "type": "loop",
            "keys": modelMap.expansionKeys,
            "data": {
              "items": [
                {
                  "variable": "expkey_type",
                  "description": "Type",
                  "type": "list",
                  "options": [
                    {
                      "text": "N/A",
                      "value": ""
                    },
                    {
                      "text": "Conference",
                      "value": "conference"
                    },
                    {
                      "text": "Forward",
                      "value": "forward"
                    },
                    {
                      "text": "Transfer",
                      "value": "transfer"
                    },
                    {
                      "text": "Hold",
                      "value": "hold"
                    },
                    {
                      "text": "DND",
                      "value": "dnd"
                    },
                    {
                      "text": "Recall",
                      "value": "recall"
                    },
                    {
                      "text": "Direct Pickup",
                      "value": "direct_pickup"
                    },
                    {
                      "text": "DTMF",
                      "value": "dtmf"
                    },
                    {
                      "text": "Voice Mail",
                      "value": "voice_mail"
                    },
                    {
                      "text": "Speed Dial",
                      "value": "speed_dial"
                    },
                    {
                      "text": "Line",
                      "value": "line"
                    },
                    {
                      "text": "BLF",
                      "value": "blf"
                    },
                    {
                      "text": "URL",
                      "value": "url"
                    },
                    {
                      "text": "Group Pickup",
                      "value": "group_pickup"
                    },
                    {
                      "text": "Multicast Paging",
                      "value": "multicast_paging"
                    },
                    {
                      "text": "Record",
                      "value": "record"
                    },
                    {
                      "text": "Prefix",
                      "value": "prefix"
                    },
                    {
                      "text": "Phone Lock",
                      "value": "phone_lock"
                    },
                    {
                      "text": "LDAP",
                      "value": "ldap"
                    }
                  ]
                },
                {
                  "variable": "expkey_value",
                  "description": "Value",
                  "type": "input"
                },
                {
                  "variable": "expkey_label",
                  "description": "Label",
                  "type": "input"
                }
              ]
            }
          }
        ]
      }
    }
    
  })