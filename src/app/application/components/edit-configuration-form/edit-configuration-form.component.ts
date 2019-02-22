import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ag-edit-configuration-form',
  templateUrl: './edit-configuration-form.component.html',
  styleUrls: ['./edit-configuration-form.component.scss']
})
export class EditConfigurationFormComponent implements OnInit {
  form: FormGroup;
  dbsizeLimits = Array.from({length: 20}).map((item, index) => index - 1);
  interVals =  Array.from({length: 200}).map((item, index) => index * 10);
  @Input() configuration;

  @Input()
  set pending(isPending: boolean) {
      if (!this.form) {
          return;
      }
      if (isPending) {
          this.form.disable();
      } else {
          this.form.enable();
      }
  }

  @Output() submitted = new EventEmitter();
  @Output() upload = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}
  groups = ['ActivityRecognition', 'Analytics', 'Jedi', 'Locations'];
  activityRecognitionControls = [
    {
      type: 'checkbox',
      name: 'Active',
      label: 'Active'
    },
    {
      type: 'formGroup',
      name: 'DBSizeLimit',
      controls: [
        {
          type: 'selectbox',
          name: 'MaxRows',
          label: 'Max rows',
          data: this.dbsizeLimits
        },
        {
          type: 'selectbox',
          name: 'MaxTime',
          label: 'Max time',
          data: this.dbsizeLimits
        },
        {
          type: 'selectbox',
          name: 'RowsToDelete',
          label: 'Rows To Delete',
          data: this.dbsizeLimits
        },
        {
          type: 'selectbox',
          name: 'TimeToDelete',
          label: 'Time To Delete',
          data: this.dbsizeLimits
        }
      ],
    },
    {
      type: 'checkbox',
      name: 'Report',
      label: 'Report'
    }
  ];

  Analytics = [
    {
      type: 'checkbox',
      name: 'Active',
      label: 'Active'
    },
    {
      type: 'formGroup',
      name: 'Report',
      controls: [
        {
          type: 'checkbox',
          name: 'Active',
          label: 'Active'
        },
        {
          type: 'selectbox',
          name: 'Interval',
          label: 'Interval',
          data: this.interVals
        },
        {
          type: 'selectbox',
          name: 'MaxRetryTime',
          label: 'MaxRetryTime',
          data: this.interVals
        },
        {
          type: 'selectbox',
          name: 'Unmetered',
          label: 'Unmetered',
          data: this.dbsizeLimits
        }
      ]
    }
  ];

  Jedi = [
    {
      type: 'checkbox',
      name: 'Active',
      label: 'Active'
    }
  ];

  Locations = [
    {
      type: 'formGroup',
      name: 'DBSizeLimit',
      controls: [
        {
          type: 'selectbox',
          name: 'MaxRows',
          label: 'Max rows',
          data: this.dbsizeLimits
        },
        {
          type: 'selectbox',
          name: 'MaxTime',
          label: 'Max time',
          data: this.dbsizeLimits
        },
        {
          type: 'selectbox',
          name: 'RowsToDelete',
          label: 'Rows To Delete',
          data: this.dbsizeLimits
        },
        {
          type: 'selectbox',
          name: 'TimeToDelete',
          label: 'Time To Delete',
          data: this.dbsizeLimits
        }
      ],
    },
  ];

  groupControls = {
    ActivityRecognition: this.activityRecognitionControls,
    Analytics: this.Analytics,
    Jedi: this.Jedi,
    Locations: this.Locations
  }

  ngOnInit() {
      this.form = this.fb.group({
        ActivityRecognition: this.fb.group({
            'Active': true,
            'DBSizeLimit': this.fb.group({
              MaxRows: '',
              MaxTime: '',
              RowsToDelete: '',
              TimeToDelete: ''
            }),
            Notify: true,
            Report: true,
          }),
        Analytics: this.fb.group({
          Active: false,
          Report: this.fb.group({
            "Active": '',
            "Interval": '',
            "MaxRetryTime": '',
            "Unmetered": '',
            "Url": ''
          })
        }),
        Jedi: this.fb.group({
          Active: true
        }),
        Locations: this.fb.group({
          'DBSizeLimit': this.fb.group({
            MaxRows: '',
            MaxTime: '',
            RowsToDelete: '',
            TimeToDelete: ''
          }),
          Notify: true
        })
      });

      if (this.configuration) {
        try {
          this.form.patchValue(this.configuration);
        } catch (e) {
          console.log(e);
        }
      }
  }

  ngOnChanges(): void {
    if (this.form && this.configuration) {
      try {
        this.form.patchValue(this.configuration);
      } catch (e) {
        console.log(e);
      }
    }
  }

  onSubmit() {
      if (this.form.valid) {
          this.submitted.emit(this.form.value);
      }
  }

  onUpload() {
    if (this.form.valid) {
      this.upload.emit(this.form.value);
    }
  }

}
