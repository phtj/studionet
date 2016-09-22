function makeGraph(dNodes, dEdges){


    //gray out
/*    dNodes = dNodes.map(function(e){
      e.data.faveColor =  #d9d9d9//"green"//''
      return e;
    })*/


    dEdges = dEdges.map(function(e){
      e.data.faveColor = '#d9d9d9';
      return e;
    })


    var cy = cytoscape({
      container: document.getElementById('cy'),
      layout: {
        name: 'cose',
        padding: 10,
        randomize: true
      },
      hideLabelsOnViewport: false,
      style: cytoscape.stylesheet()
        .selector('node')
          .css({
            'shape': 'data(faveShape)',
            'width': 'data(width)', 
            'height': 'data(height)',   // mapData(property, a, b, c, d)  => specified range a, b; actual values c, d
            //'content': 'data(name)',
            'text-valign': 'center',
            'font-size':'5%',
            'text-outline-width': 0.5,
            'text-outline-color': 'data(faveColor)',
            'background-color': 'data(faveColor)',
            'color': '#fff'
          })
          
        .selector(':selected')
          .css({
            'border-width': 5,
            'border-color': '#333',
            'width': 25, 
            'height': 25,
            'font-size': '14px'
          })
        .selector('edge')
          .css({
            'curve-style': 'bezier',
            //'opacity': 0.666,
            //'width': 'mapData(strength, 70, 100, 2, 5)',
            'width': 'mapData(weight, 0.1, 3, 1, 7)', 
            'target-arrow-shape': 'triangle',
            //'source-arrow-shape': 'circle',
            'line-color': 'data(faveColor)',
            'source-arrow-color': 'data(faveColor)',
            'content' : 'data(label)',
            'font-size':'15%',
            'color': '#d8d8d8',
            'edge-text-rotation': 'autorotate',
            'target-arrow-color': 'data(faveColor)'
          })
          
        /*.selector('edge.questionable')
          .css({
            'line-style': 'dotted',
            'target-arrow-shape': 'diamond'
          }) */
        .selector('.faded')
          .css({
            'opacity': 0.75,
            'text-opacity': 0.25
          })
          .selector('.highlighted')
          .css({
            //'background-color': 'green',
            'line-color': 'green',
            'target-arrow-color':'green'
          }),
      
      elements: {
        nodes: dNodes/*[
          { data: { id: 'm', name: 'AR2521', weight: 3, faveColor: '#112200', faveShape: 'rectangle', type:'module' } },
          { data: { id: 'mod', name: 'Moderator', weight: 3, faveColor: 'red', faveShape: 'ellipse', type:'moderator' } },
          { data: { id: 'ass1', name: 'Assignment1', weight: 3, faveColor: 'green', faveShape: 'triangle', type:'material' } },
          { data: { id: 'res', name: 'study1', weight: 3, faveColor: 'lightblue', faveShape: 'triangle', type:'material' } },
          { data: { id: 'e', name: 'Elaine', weight: 3, faveColor: 'lightblue', faveShape: 'ellipse', type:'student' } },
          { data: { id: 'k', name: 'Kramer', weight: 2, faveColor: 'lightblue', faveShape: 'ellipse', type:'student' } },
          { data: { id: 'g', name: 'George', weight: 3, faveColor: 'lightblue', faveShape: 'ellipse', type:'student' } },
          { data: { id: 's', name: 'Sakshi', weight: 3, faveColor: 'lightblue', faveShape: 'ellipse', type:'student' } },
          { data: { id: 'cE1', name: 'Rendering Techniques', weight: 3, faveColor: 'green', faveShape: 'triangle', type:'contribution' } },
          { data: { id: 'qK1', name: 'Green Houseing examples', weight: 3, faveColor: 'green', faveShape: 'triangle', type:'contribution' } },
          { data: { id: 'cS1', name: 'Deadline?', weight: 3, faveColor: 'green', faveShape: 'triangle', type:'contribution' } },
          { data: { id: 's1', name: 'sol1', weight: 3, faveColor: 'green', faveShape: 'ellipse', type:'submission' } },
          { data: { id: 's1', name: 'sol2', weight: 3, faveColor: 'green', faveShape: 'ellipse', type:'submission' } }
          
        ]*/,
        edges: dEdges/*[
          { data: { source: 'm', target: 'res', faveColor: 'lightblue', strength: 3, label: 'resource' } },
          { data: { source: 'm', target: 'mod', faveColor: 'lightblue', strength: 3, label: 'moderated_by' } },
          { data: { source: 'm', target: 'ass1', faveColor: 'lightblue', strength: 3, label:'assignment' } },
          { data: { source: 'ass1', target: 'mod', faveColor: 'lightblue', strength: 1, label:'created_by' } },
          { data: { source: 'cE1', target: 'e', faveColor: 'lightblue', strength: 1, label:'created_by' } },
          { data: { source: 'e', target: 'g', faveColor: 'lightblue', strength: 3,  label: 'follows' } },
         
          { data: { source: 'e', target: 'm', faveColor: 'lightblue', strength: 3, label: 'student_of' } },
          
          { data: { source: 's', target: 'm', faveColor: 'lightblue', strength: 3, label: 'student_of' } },  
          
          { data: { source: 'k', target: 'm', faveColor: 'lightblue', strength: 3, label: 'student_of' } },
               
          { data: { source: 'g', target: 'm', faveColor: 'lightblue', strength: 3, label: 'student_of' } },
          { data: { source: 's1', target: 'e', faveColor: 'lightblue', strength: 3, label: 'submitted_by' } },
          { data: { source: 's1', target: 'ass1', faveColor: 'lightblue', strength: 3, label: 'submitted_for' } },
          { data: { source: 'qK1', target: 'k', faveColor: 'lightblue', strength: 3, label: 'question_by' } },
          { data: { source: 'qK1', target: 'cE1', faveColor: 'lightblue', strength: 3, label: 'answered_with' } },
          { data: { source: 'cS1', target: 's', faveColor: 'lightblue', strength: 3, label: 'comment_by' } },

          { data: { source: 'cE1', target: 'cS1', faveColor: 'lightblue', strength: 3, label: 'comment_for' } }
        ]*/
      },
      

      ready: function(){
        window.cy = this;
        
        // giddy up
      }
    });


   cy.on('mouseover','node', function(evt){
      var name = evt.cyTarget.data('name');
      var data = evt.cyTarget.data();

      var directlyConnected = evt.cyTarget.neighborhood();
      
      $('#activeUser').show();
      $('#activeUser').html(getHTML(data.name, data.type, directlyConnected.nodes().length));
      
      evt.cyTarget.css({ content: name});
     });

   cy.on('mouseout','node', function(evt){
      var name = evt.cyTarget.data('name');

      $('#activeUser').hide();
      
      evt.cyTarget.css({ content: ''});
    });

   cy.on('tap','node', function(evt){
      
      var data = evt.cyTarget.data();

      //evt.cyTarget.css({ content: name});
        cy.elements().removeClass('highlighted');
        evt.cyTarget.addClass('highlighted');

        var node = evt.cyTarget;
        var directlyConnected = node.neighborhood();

        $('#activeUser').show();
        $('#activeUser').html(getHTML(data.name, data.type, directlyConnected.nodes().length));

        directlyConnected.nodes().addClass('highlighted');

        node.connectedEdges().addClass('highlighted');
    });

    
}

function getHTML(name, type, neighbours){
  return "<h1>" + name + "</h1>" + "<h5>" + type + "</h5>" + "<p>This node has " + neighbours + " connections.</p>";
}


$(document).ready(function(){



		var dNodes = [];
		var dEdges = [];

		  $.get( "/graph/all", function( data ) {
		      //console.log(data);
		      data.nodes.map( function(node){
		          var id = node.id;
		          var type = node.type;
              var name = node.name;
		          var faveShape,
                  faveColor,
                  width, 
                  height;

		          if(type=="module"){
		            faveShape = "rectangle";
                faveColor = "yellow";
                width = 40;
                height = 40;
		          }
		          if(type=="user")
		          { 
                faveShape = "ellipse";
                faveColor = "blue";
                width = 15;
                height = 15;
		          }
		          if(type=="contribution"){
		            faveShape = "rectangle";
                faveColor = "green";
                width = 25;
                height = 40;
		          }
              console.log(faveColor, faveShape);
		          dNodes.push({ 
		            data: {
		              id: id, name: name, width: width, height: height, faveShape: faveShape, type: type, faveColor: faveColor
		            }
		          });

		      })

		      
		      data.links.map(function(edge){

		          var src = edge.source;
		          var des = edge.target;

		          dEdges.push({
		          data: { 
		            source: src, target: des, strength: 3//, label: 'student_of' 
		            }

		          });
		      })

		      makeGraph(dNodes, dEdges);
		     
  		})



});


