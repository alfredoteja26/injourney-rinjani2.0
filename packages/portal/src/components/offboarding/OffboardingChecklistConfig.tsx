import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Save, Edit2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { OffboardingChecklistTemplate } from './types';

const categoryOptions = [
  { value: 'document', label: 'Documents' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'access', label: 'System Access' },
  { value: 'knowledge-transfer', label: 'Knowledge Transfer' },
  { value: 'administrative', label: 'Administrative' }
];

const picOptions = [
  'HR Admin',
  'HR Manager',
  'IT Support',
  'Department Manager',
  'Finance Team',
  'Facilities Team',
  'Legal Team'
];

export function OffboardingChecklistConfig() {
  const [templates, setTemplates] = useState<OffboardingChecklistTemplate[]>([
    {
      id: '1',
      title: 'Return Company Laptop',
      description: 'Employee must return company-issued laptop and charger',
      category: 'equipment',
      pic: 'IT Support',
      picEmail: 'it.support@injourney.co.id',
      order: 1,
      mandatory: true
    },
    {
      id: '2',
      title: 'Return Access Cards',
      description: 'Return all office access cards and parking cards',
      category: 'equipment',
      pic: 'Facilities Team',
      picEmail: 'facilities@injourney.co.id',
      order: 2,
      mandatory: true
    },
    {
      id: '3',
      title: 'Disable System Access',
      description: 'Revoke access to all company systems and applications',
      category: 'access',
      pic: 'IT Support',
      picEmail: 'it.support@injourney.co.id',
      order: 3,
      mandatory: true
    }
  ]);

  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: 'document' as const,
    pic: '',
    picEmail: '',
    mandatory: true
  });

  const handleAddItem = () => {
    if (newItem.title && newItem.description && newItem.pic && newItem.picEmail) {
      const newTemplate: OffboardingChecklistTemplate = {
        id: Date.now().toString(),
        ...newItem,
        order: templates.length + 1
      };
      setTemplates([...templates, newTemplate]);
      setNewItem({
        title: '',
        description: '',
        category: 'document',
        pic: '',
        picEmail: '',
        mandatory: true
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this checklist item?')) {
      setTemplates(templates.filter((item) => item.id !== id));
    }
  };

  const handleUpdateItem = (id: string, field: string, value: any) => {
    setTemplates(
      templates.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSaveConfiguration = () => {
    // In production, save to API/database
    alert('Checklist configuration saved successfully!');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'document': '#3B82F6',
      'equipment': '#8B5CF6',
      'access': '#EF4444',
      'knowledge-transfer': '#10B981',
      'administrative': '#F59E0B'
    };
    return colors[category] || '#6B7280';
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: '8px'
        }}>
          Offboarding Checklist Configuration
        </h2>
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--muted-foreground)'
        }}>
          Configure checklist items that will be used in the offboarding process
        </p>
      </div>

      {/* Checklist Items */}
      <div style={{ marginBottom: '24px' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <CardTitle>Checklist Templates ({templates.length})</CardTitle>
                <CardDescription>
                  Manage and organize offboarding checklist tasks
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
                <h4 style={{ marginBottom: '16px', fontWeight: 'var(--font-weight-semibold)' }}>
                  New Checklist Item
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <Label htmlFor="newTitle">
                      Task Title <span style={{ color: 'var(--destructive)' }}>*</span>
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
                    <Label htmlFor="newDescription">
                      Description <span style={{ color: 'var(--destructive)' }}>*</span>
                    </Label>
                    <Textarea
                      id="newDescription"
                      placeholder="Enter task description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      rows={3}
                      style={{ marginTop: '8px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <Label htmlFor="newCategory">
                        Category <span style={{ color: 'var(--destructive)' }}>*</span>
                      </Label>
                      <Select
                        value={newItem.category}
                        onValueChange={(value: any) => setNewItem({ ...newItem, category: value })}
                      >
                        <SelectTrigger id="newCategory" style={{ marginTop: '8px' }}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="newPic">
                        PIC (Person in Charge) <span style={{ color: 'var(--destructive)' }}>*</span>
                      </Label>
                      <Select
                        value={newItem.pic}
                        onValueChange={(value) => {
                          const email = value.toLowerCase().replace(/ /g, '.') + '@injourney.co.id';
                          setNewItem({ ...newItem, pic: value, picEmail: email });
                        }}
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

                  <div>
                    <Label htmlFor="newPicEmail">
                      PIC Email <span style={{ color: 'var(--destructive)' }}>*</span>
                    </Label>
                    <Input
                      id="newPicEmail"
                      type="email"
                      placeholder="pic@injourney.co.id"
                      value={newItem.picEmail}
                      onChange={(e) => setNewItem({ ...newItem, picEmail: e.target.value })}
                      style={{ marginTop: '8px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      id="newMandatory"
                      checked={newItem.mandatory}
                      onChange={(e) => setNewItem({ ...newItem, mandatory: e.target.checked })}
                      style={{ width: '16px', height: '16px' }}
                    />
                    <Label htmlFor="newMandatory" style={{ marginBottom: 0, cursor: 'pointer' }}>
                      Mandatory task
                    </Label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddItem}
                    disabled={!newItem.title || !newItem.description || !newItem.pic || !newItem.picEmail}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            )}

            {/* Checklist Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {templates.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: 'var(--muted-foreground)'
                }}>
                  <p>No checklist items yet. Click "Add Item" to create your first task.</p>
                </div>
              ) : (
                templates.map((item, index) => (
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
                        cursor: 'grab',
                        flexShrink: 0
                      }}
                    />

                    {/* Order Number */}
                    <div style={{
                      minWidth: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: getCategoryColor(item.category),
                      color: 'white',
                      borderRadius: '50%',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--text-sm)',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>

                    {/* Item Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {editingItem === item.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <Input
                            value={item.title}
                            onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                            placeholder="Task title"
                          />
                          <Textarea
                            value={item.description}
                            onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                            placeholder="Task description"
                            rows={2}
                          />
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <Select
                              value={item.category}
                              onValueChange={(value) => handleUpdateItem(item.id, 'category', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categoryOptions.map((cat) => (
                                  <SelectItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select
                              value={item.pic}
                              onValueChange={(value) => handleUpdateItem(item.id, 'pic', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="PIC" />
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
                      ) : (
                        <>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '4px'
                          }}>
                            <div style={{
                              fontWeight: 'var(--font-weight-medium)',
                              fontSize: 'var(--text-base)',
                              color: 'var(--foreground)'
                            }}>
                              {item.title}
                            </div>
                            {item.mandatory && (
                              <span style={{
                                padding: '2px 6px',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                color: '#EF4444',
                                fontSize: 'var(--text-xs)',
                                fontWeight: 'var(--font-weight-medium)',
                                borderRadius: 'var(--radius)'
                              }}>
                                Mandatory
                              </span>
                            )}
                          </div>
                          <div style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                            marginBottom: '8px'
                          }}>
                            {item.description}
                          </div>
                          <div style={{
                            display: 'flex',
                            gap: '12px',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)'
                          }}>
                            <span style={{
                              padding: '4px 8px',
                              backgroundColor: `${getCategoryColor(item.category)}20`,
                              color: getCategoryColor(item.category),
                              borderRadius: 'var(--radius)',
                              fontWeight: 'var(--font-weight-medium)'
                            }}>
                              {categoryOptions.find(c => c.value === item.category)?.label}
                            </span>
                            <span style={{
                              padding: '4px 8px',
                              backgroundColor: 'var(--muted)',
                              borderRadius: 'var(--radius)'
                            }}>
                              PIC: {item.pic}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
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
                          <Edit2 style={{ width: '16px', height: '16px' }} />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                        style={{ color: 'var(--destructive)' }}
                      >
                        <Trash2 style={{ width: '16px', height: '16px' }} />
                      </Button>
                    </div>
                  </div>
                ))
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
              This is how the checklist will appear during offboarding
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{
              backgroundColor: 'var(--muted)',
              padding: '24px',
              borderRadius: 'var(--radius)'
            }}>
              <h4 style={{ marginBottom: '16px', fontWeight: 'var(--font-weight-semibold)' }}>
                Offboarding Checklist Preview
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {templates.map((item, index) => (
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
                    <input
                      type="checkbox"
                      style={{ width: '20px', height: '20px' }}
                      disabled
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: 'var(--font-weight-medium)',
                        marginBottom: '4px',
                        fontSize: 'var(--text-sm)'
                      }}>
                        {item.title}
                      </div>
                      <div style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--muted-foreground)'
                      }}>
                        PIC: {item.pic}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
