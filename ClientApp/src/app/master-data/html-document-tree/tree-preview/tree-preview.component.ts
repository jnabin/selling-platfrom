import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { DocumentTreeService } from '../../services/document-tree.service';

@Component({
  selector: 'app-tree-preview',
  templateUrl: './tree-preview.component.html',
  styleUrls: ['./tree-preview.component.scss']
})
export class TreePreviewComponent implements OnInit {
  selectedFile:any;
  Tree: TreeNode[]=[];

  constructor(private documentTreeService: DocumentTreeService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.documentTreeService.get().subscribe({
      next: (result) => {
        this.Tree = <TreeNode[]>result;
        console.log(JSON.stringify(result, null, 2));
      },
      error: (err) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 5000 }) }
    });

  }

  nodeSelect(event:any) {
    this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
  }

  nodeUnselect(event:any) {
    this.messageService.add({ severity: 'info', summary: 'Node Unselected', detail: event.node.label });
  }

  // nodeDrop(event,dragNode,dropNode) {
  //   this.messageService.add({severity: 'info', summary: 'Node dragged', detail: dragNode.label+ ' ' + dropNode.label });
  // }

}
