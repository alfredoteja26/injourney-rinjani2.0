import React, { useState } from "react";
import { Plus, Trash2, GripVertical, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ChecklistItem {
  id: string;
  title: string;
  pic: string;
  deadline?: string; // ISO date string
  order: number;
}

export function ChecklistConfiguration() {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: "1",
      title: "Complete personal data form",
      pic: "HR Admin",
      order: 1,
    },
    {
      id: "2",
      title: "Sign employment contract",
      pic: "HR Manager",
      order: 2,
    },
    {
      id: "3",
      title: "Setup email and system access",
      pic: "IT Support",
      order: 3,
    },
    {
      id: "4",
      title: "Attend orientation session",
      pic: "HR Admin",
      order: 4,
    },
  ]);

  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ title: "", pic: "", deadline: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddItem = () => {
    if (newItem.title && newItem.pic) {
      const newChecklistItem: ChecklistItem = {
        id: Date.now().toString(),
        title: newItem.title,
        pic: newItem.pic,
        deadline: newItem.deadline,
        order: checklistItems.length + 1,
      };
      setChecklistItems([...checklistItems, newChecklistItem]);
      setNewItem({ title: "", pic: "", deadline: "" });
      setShowAddForm(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setChecklistItems(checklistItems.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: string, value: string) => {
    setChecklistItems(
      checklistItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSaveConfiguration = () => {
    // In production, save to API/database
    alert("Checklist configuration saved successfully!");
  };

  // Mock PIC options - in production, fetch from user management
  const picOptions = [
    "HR Admin",
    "HR Manager",
    "IT Support",
    "Department Manager",
    "Finance Team",
    "Facilities Team",
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2>Onboarding Checklist Configuration</h2>
        <p className="caption" style={{ color: 'var(--muted-foreground)', marginTop: '4px' }}>
          Configure checklist items that new employees need to complete during onboarding
        </p>
      </div>

      {/* Checklist Items */}
      <div style={{ marginBottom: '24px' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <CardTitle>Checklist Items ({checklistItems.length})</CardTitle>
                <CardDescription>
                  Manage and organize onboarding tasks
                </CardDescription>
              </div>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Plus style={{ width: '16px', height: '16px' }} />
                Add Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Add New Item Form */}
            {showAddForm && (
              <div style={{ 
                padding: '20px',
                backgroundColor: 'var(--muted)',
                borderRadius: 'var(--radius)',
                marginBottom: '20px'
              }}>
                <h4 style={{ marginBottom: '16px' }}>New Checklist Item</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <Label htmlFor="newTitle">
                      Task Title <span style={{ color: 'var(--destructive-foreground)' }}>*</span>
                    </Label>
                    <Input
                      id="newTitle"
                      placeholder="Enter task title"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      style={{ marginTop: '8px' }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPic">
                      PIC (Person in Charge) <span style={{ color: 'var(--destructive-foreground)' }}>*</span>
                    </Label>
                    <Select
                      value={newItem.pic}
                      onValueChange={(value) => setNewItem({ ...newItem, pic: value })}
                    >
                      <SelectTrigger id="newPic" style={{ marginTop: '8px' }}>
                        <SelectValue placeholder="Select PIC" />
                      </SelectTrigger>
                      <SelectContent>
                        {picOptions.map((pic) => (
                          <SelectItem key={pic} value={pic}>
                            {pic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <Label htmlFor="newDeadline">
                    Deadline (Optional)
                  </Label>
                  <Input
                    id="newDeadline"
                    type="date"
                    value={newItem.deadline}
                    onChange={(e) => setNewItem({ ...newItem, deadline: e.target.value })}
                    style={{ marginTop: '8px' }}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <p style={{ 
                    fontSize: 'var(--text-xs)', 
                    color: 'var(--muted-foreground)', 
                    marginTop: '4px' 
                  }}>
                    Set a deadline for when this task should be completed
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddItem}
                    disabled={!newItem.title || !newItem.pic}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            )}

            {/* Checklist Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {checklistItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  {/* Drag Handle */}
                  <GripVertical 
                    style={{ 
                      width: '20px', 
                      height: '20px', 
                      color: 'var(--muted-foreground)',
                      cursor: 'grab'
                    }} 
                  />

                  {/* Order Number */}
                  <div style={{ 
                    minWidth: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    borderRadius: '50%',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--text-sm)'
                  }}>
                    {index + 1}
                  </div>

                  {/* Item Details */}
                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
                    {editingItem === item.id ? (
                      <>
                        <Input
                          value={item.title}
                          onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                          placeholder="Task title"
                        />
                        <Select
                          value={item.pic}
                          onValueChange={(value) => handleUpdateItem(item.id, 'pic', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select PIC" />
                          </SelectTrigger>
                          <SelectContent>
                            {picOptions.map((pic) => (
                              <SelectItem key={pic} value={pic}>
                                {pic}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="date"
                          value={item.deadline || ''}
                          onChange={(e) => handleUpdateItem(item.id, 'deadline', e.target.value)}
                          placeholder="Deadline"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="caption" style={{ color: 'var(--muted-foreground)', marginBottom: '4px' }}>
                            Task
                          </div>
                          <div style={{ fontWeight: 'var(--font-weight-medium)' }}>
                            {item.title}
                          </div>
                        </div>
                        <div>
                          <div className="caption" style={{ color: 'var(--muted-foreground)', marginBottom: '4px' }}>
                            PIC
                          </div>
                          <div style={{ fontWeight: 'var(--font-weight-medium)' }}>
                            {item.pic}
                          </div>
                        </div>
                        <div>
                          <div className="caption" style={{ color: 'var(--muted-foreground)', marginBottom: '4px' }}>
                            Deadline
                          </div>
                          <div style={{ fontWeight: 'var(--font-weight-medium)' }}>
                            {item.deadline ? new Date(item.deadline).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            }) : '-'}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {editingItem === item.id ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingItem(null)}
                      >
                        Done
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingItem(item.id)}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                      style={{ color: 'var(--destructive-foreground)' }}
                    >
                      <Trash2 style={{ width: '16px', height: '16px' }} />
                    </Button>
                  </div>
                </div>
              ))}

              {checklistItems.length === 0 && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px',
                  color: 'var(--muted-foreground)'
                }}>
                  <p>No checklist items yet. Click "Add Item" to create your first task.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <Button
          onClick={handleSaveConfiguration}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Save style={{ width: '16px', height: '16px' }} />
          Save Configuration
        </Button>
      </div>

      {/* Preview Section */}
      <div style={{ marginTop: '32px' }}>
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              This is how the checklist will appear to new employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ 
              backgroundColor: 'var(--muted)',
              padding: '24px',
              borderRadius: 'var(--radius)'
            }}>
              <h4 style={{ marginBottom: '16px' }}>Onboarding Checklist</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {checklistItems.map((item, index) => {
                  const isOverdue = item.deadline && new Date(item.deadline) < new Date();
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius)',
                      }}
                    >
                      <input type="checkbox" style={{ width: '20px', height: '20px' }} disabled />
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '4px'
                        }}>
                          <span style={{ fontWeight: 'var(--font-weight-medium)' }}>
                            {item.title}
                          </span>
                          {item.deadline && (
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: 'var(--radius)',
                              fontSize: 'var(--text-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              backgroundColor: isOverdue ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                              color: isOverdue ? '#EF4444' : '#3B82F6'
                            }}>
                              Due: {new Date(item.deadline).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </span>
                          )}
                        </div>
                        <div className="caption" style={{ color: 'var(--muted-foreground)' }}>
                          Contact: {item.pic}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}