import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';
import { CommonVariableProvider } from "../providers/common-variable/common-variable";

@Directive({
  selector: '[cronapp-security]'
})
export class CronappSecurityDirective {

  @Input('cronapp-security') directiveValue: string;

  private session:any;
  
  private permissionSecurity = {
    visible: {
      public: true
    },
    enabled: {
      public: true
    }
  }

  constructor(private element: ElementRef, 
              private common: CommonVariableProvider,
              private renderer: Renderer) {}
  
  ngOnInit() {
    debugger;
    var perms = this.permissionSecurity;
    var roles = [];
    if (this.common.getSession() && this.common.getSession().roles) {
      roles = this.common.getSession().roles.toLowerCase().split(",");
    }

    perms = this.parsePermission(this.directiveValue);

    var show = false;
    var enabled = false;
    for (var i=0;i<roles.length;i++) {
      var role = roles[i].trim();
      if (role) {
        if (perms.visible[role]) {
          show = true;
        }
        if (perms.enabled[role]) {
          enabled = true;
        }
      }
    }

    if (!show) {
      this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
    }

    if (!enabled) {
      this.element.nativeElement.setAttribute('disabled', true);
    }
  }

  parsePermission(perm: string) {
    if (perm) {
      var perms = perm.toLowerCase().trim().split(",");
      for (var i=0;i<perms.length;i++) {
        var p = perms[i].trim();
        if (p) {
          var pair = p.split(":");
          if (pair.length == 2) {
            var key = pair[0].trim();
            var value = pair[1].trim();
            if (value) {
              var values = value.split(";");
              var json = {};
              for (var j=0;j<values.length;j++) {
                var v = values[j].trim();
                if (v) {
                  json[v] = true;
                }
              }

              this.permissionSecurity[key] = json;
            }
          }
        }
      }
    }

    return this.permissionSecurity;
  }

}
